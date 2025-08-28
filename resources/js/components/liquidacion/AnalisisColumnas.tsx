import React from 'react'
import { Alert, Badge, Card } from 'flowbite-react'
import { HiExclamationCircle, HiCheckCircle, HiClipboardCopy } from 'react-icons/hi'
import { ParseResult } from '@/utils/parseExcel'
import toast from 'react-hot-toast'

interface AnalisisColumnasProps {
  analisis: ParseResult
}

const AnalisisColumnas: React.FC<AnalisisColumnasProps> = ({ analisis }) => {
  // Si no hay columnas no procesadas, no mostrar nada
  if (analisis.columnasNoProcesadas.length === 0) {
    return null
  }

  const copiarComando = (comando: string) => {
    navigator.clipboard.writeText(comando)
    toast.success('Comando copiado al portapapeles')
  }

  const generarSugerencias = (columnas: string[]) => {
    return columnas.map(columna => {
      const key = columna.toLowerCase()
        .replace(/[áàäâ]/g, 'a')
        .replace(/[éèëê]/g, 'e') 
        .replace(/[íìïî]/g, 'i')
        .replace(/[óòöô]/g, 'o')
        .replace(/[úùüû]/g, 'u')
        .replace(/[ñ]/g, 'n')
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/g, '')
      
      return {
        columna,
        key,
        comando: `php artisan generar:columna ${key} "${columna}" "${columna}"`
      }
    })
  }

  const sugerencias = generarSugerencias(analisis.columnasNoProcesadas)

  return (
    <div className="w-full px-4 pb-4">
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            ⚠️ Columnas no procesadas detectadas
          </h3>
          <div className="flex gap-2">
            <Badge color="success">
              Procesadas: {analisis.columnasProcesadas}
            </Badge>
            <Badge color="failure">
              No procesadas: {analisis.columnasNoProcesadas.length}
            </Badge>
          </div>
        </div>

        <Alert color="warning" icon={HiExclamationCircle}>
          <div>
            <h4 className="font-semibold mb-2">
              ⚠️ Se encontraron columnas no procesadas:
            </h4>
            
            {/* Lista de columnas no procesadas */}
            <div className="flex flex-wrap gap-2 mb-4">
              {analisis.columnasNoProcesadas.map((columna, index) => (
                <Badge key={index} color="warning">
                  {columna}
                </Badge>
              ))}
            </div>

            {/* Instrucciones */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg mb-4">
              <p className="text-sm font-medium mb-2">
                💡 <strong>¿Cómo agregar estas columnas?</strong>
              </p>
              <ol className="text-sm space-y-1 ml-4 list-decimal">
                <li>Copia y ejecuta los comandos de abajo en tu terminal</li>
                <li>Ejecuta <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">php artisan migrate</code></li>
                <li>Vuelve a subir el archivo Excel</li>
              </ol>
            </div>

            {/* Comandos sugeridos */}
            <div className="space-y-2">
              <h5 className="font-semibold text-sm">Comandos sugeridos:</h5>
              {sugerencias.map((sugerencia, index) => (
                <div key={index} className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                      Para: {sugerencia.columna}
                    </span>
                    <button
                      onClick={() => copiarComando(sugerencia.comando)}
                      className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <HiClipboardCopy />
                      Copiar
                    </button>
                  </div>
                  <code className="text-xs block bg-white dark:bg-gray-800 p-2 rounded border">
                    {sugerencia.comando}
                  </code>
                </div>
              ))}
            </div>

            {/* Comando para ejecutar todas a la vez */}
            {sugerencias.length > 1 && (
              <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <p className="text-sm font-medium mb-2">
                  🚀 <strong>Ejecutar todos los comandos a la vez:</strong>
                </p>
                <div className="flex items-center justify-between">
                  <code className="text-xs bg-white dark:bg-gray-800 p-2 rounded border flex-1 mr-2">
                    {sugerencias.map(s => s.comando).join(' && ')}
                  </code>
                  <button
                    onClick={() => copiarComando(sugerencias.map(s => s.comando).join(' && '))}
                    className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <HiClipboardCopy />
                    Copiar todo
                  </button>
                </div>
              </div>
            )}
          </div>
        </Alert>
      </Card>
    </div>
  )
}

export default AnalisisColumnas
