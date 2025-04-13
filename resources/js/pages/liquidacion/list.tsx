import { useEffect, type FC } from 'react'
import NavbarSidebarLayout from '../../layouts/navbar-sidebar'
import { Breadcrumb, Label, TextInput } from 'flowbite-react'
import { HiHome } from 'react-icons/hi'
import LiquidacionesMensualesTable from '@/components/liquidacion/LiquidacionesMensualesTable'
import { Link } from 'react-router-dom'

const ListLiquidacionPage: FC = () => {
  useEffect(() => {
    document.title = 'Liquidaciones | Mutual Longvie'
  }, [])
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
                <Link to="/socios/list">Socios</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Todos los socios
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
                    id="users-search"
                    name="users-search"
                    placeholder="Search for users"
                    type="text"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <LiquidacionesMensualesTable />
    </NavbarSidebarLayout>
  )
}

export default ListLiquidacionPage
