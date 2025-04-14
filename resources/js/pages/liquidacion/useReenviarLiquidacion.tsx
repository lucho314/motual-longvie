import client from '@/lib/axiosClient'
import { useMutation, useQueryClient } from '@tanstack/react-query'

// Suponemos que este es el tipo de dato que espera el backend
type ReenviarLiquidacionDto = {
  retenciones_id: number[]
}

// Si esperás algún resultado en particular, podés tiparlo acá
type ReenviarResponse = {
  success: boolean
  message: string
}

export function useReenviarLiquidacion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (
      data: ReenviarLiquidacionDto
    ): Promise<ReenviarResponse> => {
      const response = await client.post('/api/liquidacion/reenviar', data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['liquidacion'] })
    }
  })
}
