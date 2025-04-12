// src/hooks/useCreateSocio.ts
import { Socio } from '@/interfaces/Socio'
import client from '@/lib/axiosClient'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import axios from 'axios'

type CreateSocioDto = {
  legajo: number
  nombre: string
  correo: string
}

export function useCreateSocio() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateSocioDto): Promise<Socio> => {
      const response = await client.post('/api/socios', data)
      return response.data
    },
    onSuccess: () => {
      // Refrescamos la lista de socios
      queryClient.invalidateQueries({ queryKey: ['socios'] })
    }
  })
}
