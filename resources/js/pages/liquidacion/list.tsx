import { useEffect, useState, type FC } from 'react'
import NavbarSidebarLayout from '../../layouts/navbar-sidebar'
import { Breadcrumb, Label, TextInput } from 'flowbite-react'
import { HiHome } from 'react-icons/hi'
import LiquidacionesMensualesTable from '@/components/liquidacion/LiquidacionesMensualesTable'
import { Link } from 'react-router-dom'

const ListLiquidacionPage: FC = () => {
  const [periodo, setPeriodo] = useState('')
  useEffect(() => {
    document.title = 'Liquidaciones | Mutual Longvie'
  }, [])

  const handlePeriodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPeriodo(e.target.value)
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
              <Breadcrumb.Item>
                <Link to="/liquidacion/list">Liquidacuibes</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Todas las liquidaciones
            </h1>
          </div>
          <div className="sm:flex">
            <div className="mb-3 hidden items-center dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
              <form className="lg:pr-3">
                <div className="relative mt-1 lg:w-64 xl:w-96 flex flex-row items-center gap-x-3">
                  <p className="text-white">Buscar por periodo:</p>
                  <input
                    type="month"
                    id="periodo"
                    value={periodo}
                    onChange={(e) => setPeriodo(e.target.value)}
                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <LiquidacionesMensualesTable q={periodo} />
    </NavbarSidebarLayout>
  )
}

export default ListLiquidacionPage
