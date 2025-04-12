// hooks/useDeleteSocio.ts
import client from '@/lib/axiosClient'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'

export function useDeleteSocio() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      await client.delete(`/api/socios/${id}`)
    },
    onSuccess: () => {
      toast.success('Socio eliminado correctamente')
      queryClient.invalidateQueries({ queryKey: ['socios'] })
    },
    onError: () => {
      toast.error('Error al eliminar el socio')
    }
  })
}
