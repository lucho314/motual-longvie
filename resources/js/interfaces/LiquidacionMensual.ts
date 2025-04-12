export interface LiquidacionMensual {
  id: number
  periodo: string
  user_id: number
  created_at: string
  user: {
    id: number
    name: string
    email: string
    email_verified_at: null | string
    created_at: string
    updated_at: string
  }
}
