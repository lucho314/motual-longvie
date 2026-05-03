import client from '@/lib/axiosClient'
import { User } from '@/interfaces/User'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

type CreateUserDto = {
  name: string
  email: string
  password: string
  password_confirmation: string
  must_change_password: boolean
}

type UpdatePasswordDto = {
  current_password: string
  password: string
  password_confirmation: string
}

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async (): Promise<User[]> => {
      const { data } = await client.get('/api/users')
      return data
    }
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: CreateUserDto): Promise<User> => {
      const { data } = await client.post('/api/users', payload)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })
}

export function useUpdateCurrentUserPassword() {
  return useMutation({
    mutationFn: async (payload: UpdatePasswordDto): Promise<void> => {
      await client.patch('/api/users/password', payload)
    }
  })
}
