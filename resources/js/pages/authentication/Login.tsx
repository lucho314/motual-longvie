import { useState } from 'react'
import { Card, TextInput, Label, Button, Checkbox } from 'flowbite-react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import client from '@/lib/axiosClient'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      await client.get('/sanctum/csrf-cookie')

      const res = await client.post('/login', {
        email,
        password
      })

      if (res.status === 200) {
        const data = res.data
        if (data.must_change_password) {
          navigate('/password/change')
        } else {
          navigate('/')
        }
      } else {
        const data = await res.data
        console.log({ data })
        setError(data.message || 'Login failed')
      }
    } catch (err: any) {
      // Si el servidor respondió con status 422 o similar
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Login failed')
      } else {
        setError('Error en el servidor')
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <Card className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Iniciar sesión en Mutual
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col gap-y-3">
            <Label htmlFor="email">Email</Label>
            <TextInput
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6 flex flex-col gap-y-3">
            <Label htmlFor="password">Password</Label>
            <TextInput
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <Checkbox id="rememberMe" name="rememberMe" />
              <Label htmlFor="rememberMe">Remember me</Label>
            </div>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-6">
            <Button type="submit" className="w-full">
              Iniciar sesión
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
