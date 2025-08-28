export interface DetalleLiquidacion {
  id: number
  legajo: string
  periodo: string
  cuota: string
  ss_adm: string
  fcia_maria_luisa: string
  fcia_amur: string
  fcia_la_botica: string
  oseca: string
  villegas: string
  luz_y_fza: string
  flama: string
  fontana: string
  moto_city: string
  transporte: string
  mutual_sol: string
  viandas: string
  seguro: string
  uso_ins_cd: string
  varios_bebidas: string
  prestamos: string
  interes_prestamos: string
  cantina_cd: string
  saldo: string
  interes_saldo: string
  campera: string
  asado: string
  torno_pezca: string
  sofia_shop: string
  sub_total: string
  gasto_bancario: string
  total: string
  sueldo: null
  created_at: null
  updated_at: null
  socio: Socio
}

export interface Socio {
  id: number
  legajo: number
  nombre: string
  correo: string
  deleted_at: null
  usuario_alta_id: null
  usuario_modificacion_id: null
  created_at: Date
  updated_at: Date
}
