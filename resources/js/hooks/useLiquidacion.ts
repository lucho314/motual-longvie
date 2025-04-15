import { Liquidacion } from '@/interfaces/Liquidacion'
import { Socio } from '@/interfaces/Socio'
import client from '@/lib/axiosClient'
import { useQuery } from '@tanstack/react-query'

export interface LiquidacionResponse extends Liquidacion {
  socio: Socio
  periodo: string
  id: number
}

export const useLiquidacion = ({
  liquidacionId
}: {
  liquidacionId: number | undefined
}) => {
  return useQuery<LiquidacionResponse>({
    queryKey: ['socio_liquidacion'],
    queryFn: async () => {
      const { data } = await client.get(
        `/api/liquidacion/${liquidacionId}/detalle`
      )
      return data
    },
    staleTime: 5000 // Keeps data fresh for 5 seconds
  })
}
