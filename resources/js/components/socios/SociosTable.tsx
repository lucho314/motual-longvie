import type { FC } from 'react'
import { useState } from 'react'
import { Table, Checkbox, Button } from 'flowbite-react'
import EditSocioModal from './EditSocioModal'
import Loader from '@/components/ui/loader'
import { Socio } from '@/interfaces/Socio'
import { useDeleteSocio } from '@/hooks/useDeleteSocio'

type Props = {
  socios: Socio[]
  isLoading: boolean
}

const SociosTable: FC<Props> = ({ socios, isLoading }) => {
  const [isEditOpen, setEditOpen] = useState(false)
  const [selectedSocio, setSelectedSocio] = useState<Socio | null>(null)
  const deleteSocio = useDeleteSocio()

  if (isLoading) return <Loader />
  const handleSave = (updatedSocio: Socio) => {
    // setSocios((prevSocios) =>
    //   prevSocios.map((s) => (s.id === updatedSocio.id ? updatedSocio : s))
    // );
    setEditOpen(false)
  }

  const handleDelete = (id: number) => {
    if (confirm('¿Estás seguro de que querés eliminar este socio?')) {
      deleteSocio.mutate(id)
    }
  }

  return (
    <>
      <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
        <Table.Head className="bg-gray-100 dark:bg-gray-700">
          <Table.HeadCell>
            <Checkbox id="select-all" />
          </Table.HeadCell>
          <Table.HeadCell>Legajo</Table.HeadCell>
          <Table.HeadCell>Nombre</Table.HeadCell>
          <Table.HeadCell>Correo</Table.HeadCell>
          <Table.HeadCell>Acciones</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
          {socios.map((socio) => (
            <Table.Row
              key={socio.legajo}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Table.Cell className="w-4 p-4">
                <Checkbox id={`checkbox-${socio.id}`} />
              </Table.Cell>
              <Table.Cell>{socio.legajo}</Table.Cell>
              <Table.Cell>{socio.nombre}</Table.Cell>
              <Table.Cell>{socio.correo}</Table.Cell>
              <Table.Cell>
                <div className="flex items-center gap-x-3">
                  <Button
                    size="xs"
                    color="gray"
                    onClick={() => {
                      setSelectedSocio(socio)
                      setEditOpen(true)
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    size="xs"
                    color="failure"
                    onClick={() => handleDelete(socio.id)}
                    disabled={deleteSocio.isPending}
                  >
                    {deleteSocio.isPending ? 'Eliminando...' : 'Eliminar'}
                  </Button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <EditSocioModal
        isOpen={isEditOpen}
        onClose={() => setEditOpen(false)}
        socio={selectedSocio}
        onSave={handleSave}
      />
    </>
  )
}

export default SociosTable
