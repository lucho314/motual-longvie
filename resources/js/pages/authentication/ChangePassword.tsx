// src/pages/ChangePassword.tsx

import { useState } from 'react'
import { Card, TextInput, Label, Button } from 'flowbite-react'
import { useNavigate } from 'react-router'
import client from '@/lib/axiosClient'

export default function ChangePassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    try {
      const res = await client.post('/password/change', {
        password,
        password_confirmation: confirmPassword
      })
      if (res.status === 200) {
        setSuccess('Contraseña actualizada correctamente')
        setTimeout(() => navigate('/'), 1500)
      }
    } catch (err: any) {
      setError('Error al cambiar la contraseña')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <Card className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Cambiar contraseña
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col gap-y-3">
            <Label htmlFor="password">Nueva contraseña</Label>
            <TextInput
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6 flex flex-col gap-y-3">
            <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
            <TextInput
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}
          <div className="mb-6">
            <Button type="submit" className="w-full">
              Cambiar contraseña
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
