import { useForm } from 'react-hook-form'
import { FC, useEffect } from 'react'
import { Modal, Label, TextInput, Button } from 'flowbite-react'
import { Socio } from '@/interfaces/Socio'
import { useUpdateSocio } from '@/hooks/useUpdateSocio '
import toast from 'react-hot-toast'

interface Props {
  isOpen: boolean
  onClose: () => void
  socio: Socio | null
  onSave: (data: Socio) => void
}

const EditSocioModal: FC<Props> = ({ isOpen, onClose, socio, onSave }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Socio>()

  const updateSocio = useUpdateSocio()

  useEffect(() => {
    if (socio) {
      reset(socio) // Resetea el form con los valores del socio
    }
  }, [socio, reset])

  const onSubmit = async (data: Socio) => {
    try {
      await updateSocio.mutateAsync(data)
      toast.success('Socio actualizado correctamente')
      onSave?.(data)
      onClose()
    } catch (error) {
      toast.error('Hubo un error al actualizar el socio')
    }
  }

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Editar Socio</Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <Label htmlFor="legajo">Legajo</Label>
              <TextInput
                id="legajo"
                type="number"
                {...register('legajo', {
                  required: 'Este campo es obligatorio'
                })}
              />
              {errors.legajo && (
                <p className="text-red-500 text-sm">{errors.legajo.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="nombre">Nombre</Label>
              <TextInput
                id="nombre"
                {...register('nombre', {
                  required: 'Este campo es obligatorio'
                })}
              />
              {errors.nombre && (
                <p className="text-red-500 text-sm">{errors.nombre.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="correo">Correo</Label>
              <TextInput
                id="correo"
                type="email"
                {...register('correo', {
                  required: 'Este campo es obligatorio',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Correo inválido'
                  }
                })}
              />
              {errors.correo && (
                <p className="text-red-500 text-sm">{errors.correo.message}</p>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">Guardar</Button>
          <Button color="gray" onClick={onClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default EditSocioModal
