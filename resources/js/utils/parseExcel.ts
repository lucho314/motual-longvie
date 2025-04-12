import * as XLSX from "xlsx";
import { Liquidacion } from "@/interfaces/Liquidacion"; // ajustá la ruta según tu proyecto

export function parseExcelToLiquidaciones(file: File): Promise<Liquidacion[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target!.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: 0 });
        const liquidaciones: Liquidacion[] = jsonData.map((row, index) => ({
            legajo: Number(row['Legajo']) || 0,
            socioNombre: row['Apellido y Nombre'] || '',
            cuota: Number(row['cuota']) || 0,
            ss_adm: Number(row['Ss Adm']) || 0,
            fcia_maria_luisa: Number(row['Fcia Maria Luisa']) || 0,
            fcia_amur: Number(row['Fcia AMUR']) || 0,
            fcia_la_botica: Number(row['Fcia La botica']) || 0,
            oseca: Number(row['Oseca']) || 0,
            villegas: Number(row['Villegas']) || 0,
            luz_y_fza: Number(row['Luz y Fza']) || 0,
            flama: Number(row['Flama']) || 0,
            fontana: Number(row['Fontana']) || 0,
            moto_city: Number(row['Moto city']) || 0,
            transporte: Number(row['Transporte']) || 0,
            mutual_sol: Number(row['Mutual Sol']) || 0,
            viandas: Number(row['Viandas']) || 0,
            seguro: Number(row['Seguro']) || 0,
            uso_ins_cd: Number(row['Uso Ins Cd']) || 0,
            cantina_cd: Number(row['Cantina CD']) || 0,
            saldo: Number(row['Saldos']) || 0,
            interes_saldo: Number(row['Inter. Saldo']) || 0,
            sub_total: Number(row['Sb total']) || 0,
            gasto_bancario: Number(row['Gas Banc']) || 0,
            total: Number(row['TOTAL']) || 0,
          }));

        resolve(liquidaciones);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);

    reader.readAsArrayBuffer(file);
  });
}
