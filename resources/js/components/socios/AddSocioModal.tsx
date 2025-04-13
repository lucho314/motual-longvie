import { FC, useState } from 'react'
import { Button, Label, Modal, Spinner, TextInput } from 'flowbite-react'
import { HiPlus } from 'react-icons/hi'
import { useCreateSocio } from '@/hooks/useCreateSocio'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { socioSchema } from '@/schemas/socioSchema'
import toast from 'react-hot-toast'

type FormData = {
  legajo: number
  nombre: string
  correo: string
}

const AddSocioModal: FC = function () {
  const [isOpen, setOpen] = useState(false)
  const [serverErrors, setServerErrors] = useState<Partial<FormData>>({})

  const createSocio = useCreateSocio()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(socioSchema)
  })

  const onSubmit = (data: FormData) => {
    setServerErrors({}) // Limpiamos errores previos
    createSocio.mutate(data, {
      onSuccess: () => {
        toast.success('Socio agregado con éxito')
        reset()
        setOpen(false)
      },
      onError: (error: any) => {
        console.error('Error creando socio:', error)
        if (error?.errors) {
          // Captura los errores de validación que vienen del backend
          setServerErrors(error.errors)
        } else {
          toast.error('Hubo un error al agregar el socio')
        }
      }
    })
  }

  return (
    <>
      <Button color="primary" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-3">
          <HiPlus className="text-xl" />
          Agregar socio
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Agregar nuevo socio</strong>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <Label htmlFor="legajo">Legajo</Label>
                <div className="mt-1">
                  <TextInput
                    id="legajo"
                    type="number"
                    placeholder="12345"
                    {...register('legajo')}
                  />
                  {(errors.legajo || serverErrors.legajo) && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.legajo?.message || serverErrors.legajo}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="nombre">Nombre</Label>
                <div className="mt-1">
                  <TextInput
                    id="nombre"
                    placeholder="Juan Pérez"
                    {...register('nombre')}
                  />
                  {(errors.nombre || serverErrors.nombre) && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.nombre?.message || serverErrors.nombre}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="correo">Correo</Label>
                <div className="mt-1">
                  <TextInput
                    id="correo"
                    type="correo"
                    placeholder="socio@correo.com"
                    {...register('correo')}
                  />
                  {(errors.correo || serverErrors.correo) && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.correo?.message || serverErrors.correo}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              color="primary"
              type="submit"
              disabled={createSocio.isPending}
            >
              {createSocio.isPending ? (
                <div className="flex items-center gap-2">
                  <Spinner size="sm" />
                  Guardando...
                </div>
              ) : (
                'Guardar socio'
              )}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default AddSocioModal
