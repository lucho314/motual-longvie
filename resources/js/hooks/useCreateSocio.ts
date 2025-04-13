import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Socio } from '@/interfaces/Socio'
import client from '@/lib/axiosClient'
type CreateSocioDto = {
  legajo: number
  nombre: string
  correo: string
}

export function useCreateSocio() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateSocioDto): Promise<Socio> => {
      try {
        const response = await client.post('/api/socios', data)
        return response.data
      } catch (error) {
        // Lanzamos el error para que pueda capturarse más adelante
        if (axios.isAxiosError(error)) {
          throw error.response?.data || error
        }
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['socios'] })
    },
    onError: (error) => {
      // Podés loguear o hacer algo más si querés
      console.error('Error creando socio:', error)
    }
  })
}
