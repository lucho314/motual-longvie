import * as XLSX from 'xlsx'
import { Liquidacion } from '@/interfaces/Liquidacion' // ajustá la ruta según tu proyecto

// Mapeo de columnas esperadas del Excel a campos del sistema
const COLUMN_MAPPING = {
  'Legajo': 'legajo',
  'Apellido y Nombre': 'socioNombre',
  'cuota': 'cuota',
  'Ss Adm': 'ss_adm',
  'Fcia Maria Luisa': 'fcia_maria_luisa',
  'Fcia AMUR': 'fcia_amur',
  'Fcia La botica': 'fcia_la_botica',
  'Oseca': 'oseca',
  'Villegas': 'villegas',
  'Luz y Fza': 'luz_y_fza',
  'Flama': 'flama',
  'Fontana': 'fontana',
  'Moto city': 'moto_city',
  'Transporte': 'transporte',
  'Mutual Sol': 'mutual_sol',
  'Viandas': 'viandas',
  'Seguro': 'seguro',
  'Uso Ins Cd': 'uso_ins_cd',
  'Varios -Bebidas': 'varios_bebidas',
  'Varios - Bebidas': 'varios_bebidas',
  'Varios-Bebidas': 'varios_bebidas',
  'Prestamo': 'prestamos',
  'Int Prest': 'interes_prestamos',
  'Cantina CD': 'cantina_cd',
  'Saldos': 'saldo',
  'Inter. Saldo': 'interes_saldo',
  'Campera': 'campera',
  'Asado': 'asado',
  'Torno Pezca': 'torno_pezca',
  'Sb total': 'sub_total',
  'Gas Banc': 'gasto_bancario',
  'TOTAL': 'total',
  "Sofia Shop":'sofia_shop',
  "Sueldo":'sueldo'
}

export interface ParseResult {
  liquidaciones: Liquidacion[]
  columnasNoProcesadas: string[]
  totalColumnas: number
  columnasProcesadas: number
}

export function parseExcelToLiquidaciones(file: File): Promise<ParseResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target!.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]

        const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, {
          defval: 0
        })

        // Detectar columnas del Excel
        const columnasExcel = jsonData.length > 0 ? Object.keys(jsonData[0]) : []
        const columnasConocidas = Object.keys(COLUMN_MAPPING)
        
        // Encontrar columnas no procesadas
        const columnasNoProcesadas = columnasExcel.filter(col => 
          !columnasConocidas.includes(col) && 
          !columnasConocidas.some(known => col.includes(known.split(' ')[0])) // Buscar variaciones
        )

        // Log de análisis
        console.log('📊 Análisis de columnas del Excel:')
        console.log('Total de columnas en Excel:', columnasExcel.length)
        console.log('Columnas procesadas:', columnasExcel.length - columnasNoProcesadas.length)
        console.log('Columnas encontradas:', columnasExcel)
        
        if (columnasNoProcesadas.length > 0) {
          console.warn('⚠️ Columnas NO procesadas:', columnasNoProcesadas)
          console.warn('💡 Considera agregar estas columnas usando: php artisan generar:columna')
        } else {
          console.log('✅ Todas las columnas están siendo procesadas')
        }

        const liquidaciones: Liquidacion[] = jsonData.map((row, index) => ({
          legajo: +Number(row['Legajo']).toFixed(2) || 0,
          socioNombre: row['Apellido y Nombre'] || '',
          cuota: +Number(row['cuota']).toFixed(2) || 0,
          ss_adm: +Number(row['Ss Adm']).toFixed(2) || 0,
          fcia_maria_luisa: +Number(row['Fcia Maria Luisa']).toFixed(2) || 0,
          fcia_amur: +Number(row['Fcia AMUR']).toFixed(2) || 0,
          fcia_la_botica: +Number(row['Fcia La botica']).toFixed(2) || 0,
          oseca: +Number(row['Oseca']).toFixed(2) || 0,
          villegas: +Number(row['Villegas']).toFixed(2) || 0,
          luz_y_fza: +Number(row['Luz y Fza']).toFixed(2) || 0,
          flama: +Number(row['Flama']).toFixed(2) || 0,
          fontana: +Number(row['Fontana']).toFixed(2) || 0,
          moto_city: +Number(row['Moto city']).toFixed(2) || 0,
          transporte: +Number(row['Transporte']).toFixed(2) || 0,
          mutual_sol: +Number(row['Mutual Sol']).toFixed(2) || 0,
          viandas: +Number(row['Viandas']).toFixed(2) || 0,
          seguro: +Number(row['Seguro']).toFixed(2) || 0,
          uso_ins_cd: +Number(row['Uso Ins Cd']).toFixed(2) || 0,
          varios_bebidas: +Number(row['Varios -Bebidas'] || row['Varios - Bebidas'] || row['Varios-Bebidas'] || 0).toFixed(2) || 0,
          prestamos: +Number(row['Prestamo']).toFixed(2) || 0,
          interes_prestamos: +Number(row['Int Prest']).toFixed(2) || 0,
          cantina_cd: +Number(row['Cantina CD']).toFixed(2) || 0,
          saldo: +Number(row['Saldos']).toFixed(2) || 0,
          interes_saldo: +Number(row['Inter. Saldo']).toFixed(2) || 0,
          campera: +Number(row['Campera']).toFixed(2) || 0,
          asado: +Number(row['Asado']).toFixed(2) || 0,
          torno_pezca: +Number(row['Torno Pezca']).toFixed(2) || 0,
          sofia_shop: +Number(row['Sofia Shop']).toFixed(2) || 0,
          sub_total: +Number(row['Sb total']).toFixed(2) || 0,
          gasto_bancario: +Number(row['Gas Banc']).toFixed(2) || 0,
          total: +Number(row['TOTAL']).toFixed(2) || 0
        }))

        console.log('Liquidaciones parsed:', liquidaciones)
        
        // Devolver resultado completo con análisis
        const result: ParseResult = {
          liquidaciones,
          columnasNoProcesadas,
          totalColumnas: columnasExcel.length,
          columnasProcesadas: columnasExcel.length - columnasNoProcesadas.length
        }
        
        resolve(result)
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = (error) => reject(error)

    reader.readAsArrayBuffer(file)
  })
}

// Función de compatibilidad que devuelve solo las liquidaciones (como antes)
export function parseExcelToLiquidacionesSimple(file: File): Promise<Liquidacion[]> {
  return parseExcelToLiquidaciones(file).then(result => result.liquidaciones)
}

// Función para obtener solo el análisis de columnas sin procesar los datos
export function analizarColumnasExcel(file: File): Promise<{
  columnasEncontradas: string[]
  columnasNoProcesadas: string[]
  sugerencias: Array<{columna: string, comando: string}>
}> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target!.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]

        const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: 0 })
        const columnasExcel = jsonData.length > 0 ? Object.keys(jsonData[0]) : []
        const columnasConocidas = Object.keys(COLUMN_MAPPING)
        
        const columnasNoProcesadas = columnasExcel.filter(col => 
          !columnasConocidas.includes(col) && 
          !columnasConocidas.some(known => col.includes(known.split(' ')[0]))
        )

        // Generar sugerencias de comandos
        const sugerencias = columnasNoProcesadas.map(columna => {
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
            comando: `php artisan generar:columna ${key} "${columna}" "${columna}"`
          }
        })

        resolve({
          columnasEncontradas: columnasExcel,
          columnasNoProcesadas,
          sugerencias
        })
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = (error) => reject(error)
    reader.readAsArrayBuffer(file)
  })
}
