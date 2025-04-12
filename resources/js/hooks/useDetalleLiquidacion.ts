import { DetalleLiquidacion } from '@/interfaces/DetalleLiquidacion'
import { LiquidacionMensual } from '@/interfaces/LiquidacionMensual'
import { PaginatedResponse } from '@/interfaces/PaginatedResponse'
import client from '@/lib/axiosClient'
import { useQuery } from '@tanstack/react-query'

export const useDetalleLiquidacion = ({ periodo }: { periodo: string }) => {
  return useQuery<DetalleLiquidacion[]>({
    queryKey: ['DetalleLiquidacion', periodo],
    queryFn: async () => {
      const { data } = await client.get(`/api/liquidacion/${periodo}`)
      return data
    },
    staleTime: 5000 // Keeps data fresh for 5 seconds
  })
}
