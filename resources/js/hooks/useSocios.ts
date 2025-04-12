import client from '@/lib/axiosClient'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

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

export const useSocios = ({
  page,
  search
}: {
  page: number
  search: string
}) => {
  return useQuery({
    queryKey: ['socios', page, search],
    queryFn: async () => {
      const { data } = await client.get('/api/socios', {
        params: { page, search }
      })
      return data
    },
    staleTime: 5000 // Keeps data fresh for 5 seconds
  })
}
