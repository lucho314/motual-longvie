import DetalleLiquidacionTable from '@/components/liquidacion/DetalleLiquidacionTable'
import { useDetalleLiquidacion } from '@/hooks/useDetalleLiquidacion'
import NavbarSidebarLayout from '@/layouts/navbar-sidebar'
import { Breadcrumb, Label, TextInput } from 'flowbite-react'
import { FC, useEffect, useState } from 'react'
import { HiHome } from 'react-icons/hi'
import { useLocation, useParams } from 'react-router'

const DetalleLiquidacionPage: FC = () => {
  const { periodo } = useParams<{ periodo: string }>()
  const [search, setSearch] = useState('')

  const { data, isLoading } = useDetalleLiquidacion({
    periodo: periodo || ''
  })

  useEffect(() => {
    document.title = 'Detalle liquidacion | Mutual Longvie'
  }, [])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearch(e.target.value.toLowerCase())
  }

  const filteredData = data?.filter((item) =>
    item.socio?.nombre?.toLowerCase().includes(search)
  )

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
          <div className="sm:flex">
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
          </div>
        </div>
      </div>
      <DetalleLiquidacionTable
        detallLiquidacion={filteredData}
        isLoading={isLoading}
      />
    </NavbarSidebarLayout>
  )
}

export default DetalleLiquidacionPage
