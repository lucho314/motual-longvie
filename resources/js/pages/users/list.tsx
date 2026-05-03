import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import {
  Alert,
  Badge,
  Breadcrumb,
  Button,
  Checkbox,
  Label,
  Modal,
  Spinner,
  Table,
  TextInput
} from 'flowbite-react'
import {
  HiHome,
  HiKey,
  HiPlus,
  HiRefresh,
  HiShieldCheck,
  HiUsers
} from 'react-icons/hi'
import axios from 'axios'
import toast from 'react-hot-toast'
import NavbarSidebarLayout from '@/layouts/navbar-sidebar'
import {
  useCreateUser,
  useUpdateCurrentUserPassword,
  useUsers
} from '@/hooks/useUsers'

type FieldErrors = Record<string, string[]>

const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError<{ message?: string; errors?: FieldErrors }>(error)) {
    const errors = error.response?.data.errors
    const firstError = errors ? Object.values(errors).flat()[0] : undefined

    return firstError || error.response?.data.message || 'No se pudo completar la operación.'
  }

  return 'No se pudo completar la operación.'
}

export default function UserListPage() {
  const usersQuery = useUsers()

  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="min-h-screen bg-gray-50 pb-20 dark:bg-gray-900 md:pb-0">
        <header className="border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <Breadcrumb className="mb-4">
            <Breadcrumb.Item href="/">
              <div className="flex items-center gap-x-3">
                <HiHome className="text-xl" />
                <span className="dark:text-white">Inicio</span>
              </div>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Usuarios</Breadcrumb.Item>
          </Breadcrumb>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                Usuarios y seguridad
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Administrá accesos y actualizá tu contraseña.
              </p>
            </div>
            <AddUserModal />
          </div>
        </header>

        <div className="grid gap-6 p-4 xl:grid-cols-[minmax(0,1fr)_420px]">
          <section className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <HiUsers className="text-xl text-gray-500 dark:text-gray-400" />
                <h2 className="font-semibold text-gray-900 dark:text-white">
                  Usuarios registrados
                </h2>
              </div>
              <Button
                color="gray"
                size="sm"
                onClick={() => usersQuery.refetch()}
                disabled={usersQuery.isFetching}
              >
                <div className="flex items-center gap-2">
                  <HiRefresh />
                  Actualizar
                </div>
              </Button>
            </div>
            <UsersTable
              isLoading={usersQuery.isLoading}
              users={usersQuery.data ?? []}
            />
          </section>

          <ChangePasswordPanel />
        </div>
      </div>
    </NavbarSidebarLayout>
  )
}

function UsersTable({
  users,
  isLoading
}: {
  users: NonNullable<ReturnType<typeof useUsers>['data']>
  isLoading: boolean
}) {
  const formattedUsers = useMemo(
    () =>
      users.map((user) => ({
        ...user,
        createdLabel: user.created_at
          ? new Intl.DateTimeFormat('es-AR', {
              dateStyle: 'short',
              timeStyle: 'short'
            }).format(new Date(user.created_at))
          : '-'
      })),
    [users]
  )

  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (formattedUsers.length === 0) {
    return (
      <div className="p-6 text-sm text-gray-500 dark:text-gray-400">
        No hay usuarios cargados.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <Table.Head>
          <Table.HeadCell>Nombre</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Estado</Table.HeadCell>
          <Table.HeadCell>Creado</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y divide-gray-200 dark:divide-gray-700">
          {formattedUsers.map((user) => (
            <Table.Row
              key={user.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {user.name}
              </Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>
                {user.must_change_password ? (
                  <Badge color="warning" className="w-fit">
                    Debe cambiar contraseña
                  </Badge>
                ) : (
                  <Badge color="success" className="w-fit">
                    Activo
                  </Badge>
                )}
              </Table.Cell>
              <Table.Cell>{user.createdLabel}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

function AddUserModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [mustChangePassword, setMustChangePassword] = useState(true)
  const createUser = useCreateUser()

  const resetForm = () => {
    setName('')
    setEmail('')
    setPassword('')
    setPasswordConfirmation('')
    setMustChangePassword(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    resetForm()
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await createUser.mutateAsync({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        must_change_password: mustChangePassword
      })
      toast.success('Usuario creado correctamente')
      closeModal()
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  return (
    <>
      <Button color="primary" onClick={() => setIsOpen(true)}>
        <div className="flex items-center gap-2">
          <HiPlus className="text-lg" />
          Crear usuario
        </div>
      </Button>
      <Modal show={isOpen} onClose={closeModal}>
        <form onSubmit={handleSubmit}>
          <Modal.Header>Crear usuario</Modal.Header>
          <Modal.Body>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="name" value="Nombre" />
                <TextInput
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="email" value="Email" />
                <TextInput
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password" value="Contraseña inicial" />
                <TextInput
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  minLength={8}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password_confirmation" value="Confirmación" />
                <TextInput
                  id="password_confirmation"
                  type="password"
                  value={passwordConfirmation}
                  onChange={(event) =>
                    setPasswordConfirmation(event.target.value)
                  }
                  minLength={8}
                  required
                />
              </div>
              <label
                htmlFor="must_change_password"
                className="flex items-start gap-3 rounded-lg border border-gray-200 p-3 text-sm dark:border-gray-700"
              >
                <Checkbox
                  id="must_change_password"
                  checked={mustChangePassword}
                  onChange={(event) =>
                    setMustChangePassword(event.target.checked)
                  }
                />
                <span className="text-gray-700 dark:text-gray-300">
                  Solicitar cambio de contraseña en el próximo ingreso.
                </span>
              </label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" disabled={createUser.isPending}>
              {createUser.isPending ? 'Creando...' : 'Crear usuario'}
            </Button>
            <Button color="gray" onClick={closeModal}>
              Cancelar
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

function ChangePasswordPanel() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const updatePassword = useUpdateCurrentUserPassword()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await updatePassword.mutateAsync({
        current_password: currentPassword,
        password,
        password_confirmation: passwordConfirmation
      })
      setCurrentPassword('')
      setPassword('')
      setPasswordConfirmation('')
      toast.success('Contraseña actualizada correctamente')
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  return (
    <section className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <HiShieldCheck className="text-xl text-gray-500 dark:text-gray-400" />
          <h2 className="font-semibold text-gray-900 dark:text-white">
            Cambiar mi contraseña
          </h2>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 p-4">
        <Alert color="info">
          La contraseña nueva debe tener al menos 8 caracteres.
        </Alert>
        <div>
          <Label htmlFor="current_password" value="Contraseña actual" />
          <TextInput
            id="current_password"
            type="password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="new_password" value="Nueva contraseña" />
          <TextInput
            id="new_password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={8}
            required
          />
        </div>
        <div>
          <Label htmlFor="new_password_confirmation" value="Confirmación" />
          <TextInput
            id="new_password_confirmation"
            type="password"
            value={passwordConfirmation}
            onChange={(event) => setPasswordConfirmation(event.target.value)}
            minLength={8}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={updatePassword.isPending}>
          <div className="flex items-center justify-center gap-2">
            <HiKey />
            {updatePassword.isPending ? 'Actualizando...' : 'Cambiar contraseña'}
          </div>
        </Button>
      </form>
    </section>
  )
}
