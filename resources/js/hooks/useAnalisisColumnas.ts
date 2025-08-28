import { useState } from 'react'
import { analizarColumnasExcel } from '@/utils/parseExcel'
import toast from 'react-hot-toast'

interface AnalisisColumnas {
  columnasEncontradas: string[]
  columnasNoProcesadas: string[]
  sugerencias: Array<{columna: string, comando: string}>
}

export const useAnalisisColumnas = () => {
  const [analisis, setAnalisis] = useState<AnalisisColumnas | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analizarArchivo = async (file: File) => {
    setIsAnalyzing(true)
    try {
      const resultado = await analizarColumnasExcel(file)
      setAnalisis(resultado)
      
      // Mostrar notificaciones
      if (resultado.columnasNoProcesadas.length > 0) {
        toast.error(`⚠️ Se encontraron ${resultado.columnasNoProcesadas.length} columnas no procesadas`)
      } else {
        toast.success('✅ Todas las columnas están siendo procesadas')
      }
      
      return resultado
    } catch (error) {
      console.error('Error al analizar columnas:', error)
      toast.error('Error al analizar las columnas del Excel')
      throw error
    } finally {
      setIsAnalyzing(false)
    }
  }

  const limpiarAnalisis = () => {
    setAnalisis(null)
  }

  return {
    analisis,
    isAnalyzing,
    analizarArchivo,
    limpiarAnalisis
  }
}
