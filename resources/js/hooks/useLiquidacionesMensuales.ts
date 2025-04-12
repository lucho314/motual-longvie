import { LiquidacionMensual } from '@/interfaces/LiquidacionMensual'
import { PaginatedResponse } from '@/interfaces/PaginatedResponse'
import client from '@/lib/axiosClient'
import { useQuery } from '@tanstack/react-query'

interface Socio {
  id: number
  legajo: number
  nombre: string
  correo: string
}

interface PaginadoResponse {
  data: Socio[]
  total: number
  current_page: number
  last_page: number
  per_page: number
}

export const useLiquidacionesMensuales = ({
  page,
  search
}: {
  page: number
  search: string
}) => {
  return useQuery<PaginatedResponse<LiquidacionMensual>>({
    queryKey: ['LiquidacionMensual', page, search],
    queryFn: async () => {
      const { data } = await client.get('/api/liquidacion', {
        params: { page, search }
      })
      return data
    },
    staleTime: 5000 // Keeps data fresh for 5 seconds
  })
}
