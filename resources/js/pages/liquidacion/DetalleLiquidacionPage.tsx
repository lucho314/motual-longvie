import DetalleLiquidacionTable from '@/components/liquidacion/DetalleLiquidacionTable'
import { useDetalleLiquidacion } from '@/hooks/useDetalleLiquidacion'
import NavbarSidebarLayout from '@/layouts/navbar-sidebar'
import { Badge, Breadcrumb, Button, Label, TextInput } from 'flowbite-react'
import { FC, useEffect, useState } from 'react'
import { BiMailSend } from 'react-icons/bi'
import { HiHome } from 'react-icons/hi'
import { useLocation, useParams } from 'react-router'
import { useReenviarLiquidacion } from './useReenviarLiquidacion'

const DetalleLiquidacionPage: FC = () => {
  const { periodo } = useParams<{ periodo: string }>()
  const [search, setSearch] = useState('')
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const { data, isLoading } = useDetalleLiquidacion({
    periodo: periodo || ''
  })

  const { mutate: reenviarLiquidacion, isPending } = useReenviarLiquidacion()

  useEffect(() => {
    document.title = 'Detalle liquidacion | Mutual Longvie'
  }, [])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearch(e.target.value.toLowerCase())
  }
  const handleSelectionChange = (ids: number[]) => {
    setSelectedIds(ids)
  }

  const filteredData = data?.filter((item) =>
    item.socio?.nombre?.toLowerCase().includes(search)
  )

  const handleReenviar = () => {
    if (selectedIds.length === 0) return

    reenviarLiquidacion(
      { retenciones_id: selectedIds },
      {
        onSuccess: (res) => {
          console.log('Reenvío exitoso:', res)
          // Podés mostrar una notificación acá
        },
        onError: (error) => {
          console.error('Error al reenviar:', error)
        }
      }
    )
  }

  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <Breadcrumb className="mb-4">
              <Breadcrumb.Item href="#">
                <div className="flex items-center gap-x-3">
                  <HiHome className="text-xl" />
                  <span className="dark:text-white">Home</span>
                </div>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/liquidacion/list">
                Liquidaciones
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/liquidacion/list">List</Breadcrumb.Item>
              <Breadcrumb.Item>detalle</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Detalle de liquidacion periodo {periodo}
            </h1>
          </div>
          <div className="sm:flex sm:justify-between">
            <div className="mb-3 hidden items-center dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
              <form className="lg:pr-3">
                <Label htmlFor="users-search" className="sr-only">
                  Search
                </Label>
                <div className="relative mt-1 lg:w-64 xl:w-96">
                  <TextInput
                    id="socio-search"
                    name="socio-search"
                    placeholder="Buscar por socio"
                    type="text"
                    onInput={handleChange}
                  />
                </div>
              </form>
            </div>

            <div className="mb-3 hidden items-center dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
              <p className="mr-3 text-sm font-medium text-gray-900 dark:text-white">
                <Badge> Seleccionados: {selectedIds.length}</Badge>
              </p>
            </div>
            <div className="flex">
              <Button color="success" onClick={handleReenviar}>
                <div className="flex items-center gap-x-3">
                  <BiMailSend />
                  <span className="dark:text-white">Reenviar liquidacion</span>
                  <span className="dark:text-white"></span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <DetalleLiquidacionTable
        detallLiquidacion={filteredData}
        isLoading={isLoading}
        onSelectionChange={handleSelectionChange}
      />
    </NavbarSidebarLayout>
  )
}

export default DetalleLiquidacionPage
