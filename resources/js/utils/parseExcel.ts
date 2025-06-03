import * as XLSX from 'xlsx'
import { Liquidacion } from '@/interfaces/Liquidacion' // ajustá la ruta según tu proyecto

export function parseExcelToLiquidaciones(file: File): Promise<Liquidacion[]> {
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
          cantina_cd: +Number(row['Cantina CD']).toFixed(2) || 0,
          saldo: +Number(row['Saldos']).toFixed(2) || 0,
          interes_saldo: +Number(row['Inter. Saldo']).toFixed(2) || 0,
          sub_total: +Number(row['Sb total']).toFixed(2) || 0,
          gasto_bancario: +Number(row['Gas Banc']).toFixed(2) || 0,
          total: +Number(row['TOTAL']).toFixed(2) || 0
        }))

        resolve(liquidaciones)
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = (error) => reject(error)

    reader.readAsArrayBuffer(file)
  })
}
