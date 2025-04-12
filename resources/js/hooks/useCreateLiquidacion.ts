import { Liquidacion } from '@/interfaces/Liquidacion'
import client from '@/lib/axiosClient'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import axios from 'axios'

interface CreateLiquidacionDto {
  liquidaciones: Liquidacion[]
  periodo: string
}

export function useCreateLiquidacion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateLiquidacionDto): Promise<Liquidacion[]> => {
      const response = await client.post('/api/liquidacion', data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['liquidacion'] })
    }
  })
}
