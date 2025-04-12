import axios from 'axios'
import { HiLogout } from 'react-icons/hi'
import { Sidebar } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import client from '@/lib/axiosClient'

export default function LogoutButton() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      //await client.get('/sanctum/csrf-cookie')
      await client.post('/logout')

      navigate('/login')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  return (
    <Sidebar.Item
      as="button"
      icon={HiLogout}
      onClick={handleLogout}
      className="text-red-600 hover:bg-red-100 dark:hover:bg-red-700"
    >
      Cerrar sesión
    </Sidebar.Item>
  )
}
