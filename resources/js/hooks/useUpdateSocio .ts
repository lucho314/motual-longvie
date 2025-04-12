import { Socio } from '@/interfaces/Socio'
import client from '@/lib/axiosClient'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export const useUpdateSocio = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (updatedSocio: Socio) =>
      client.put(`/api/socios/${updatedSocio.id}`, updatedSocio),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['socios'] })
    }
  })
}
