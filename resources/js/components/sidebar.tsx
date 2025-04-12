import { Sidebar, TextInput } from 'flowbite-react'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import {
  HiDocumentReport,
  HiFolderOpen,
  HiLogout,
  HiSearch
} from 'react-icons/hi'
import { HiUsers } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'
import LogoutButton from './auth/LogoutButton'

const ExampleSidebar: FC = function () {
  const location = useLocation()
  const currentPage = location.pathname
  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <div className="flex h-full flex-col justify-between py-2">
        <div>
          <form className="pb-3 md:hidden">
            <TextInput
              icon={HiSearch}
              type="search"
              placeholder="Search"
              required
              size={32}
            />
          </form>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                as={Link}
                to="/socios/list"
                icon={HiUsers}
                className={
                  '/socios' === currentPage
                    ? 'bg-gray-100 dark:bg-gray-700'
                    : ''
                }
              >
                Socios
              </Sidebar.Item>
              <Sidebar.Item
                as={Link}
                to="/liquidacion/upload"
                icon={HiDocumentReport}
                className={
                  '/liquidacion/upload' === currentPage
                    ? 'bg-gray-100 dark:bg-gray-700'
                    : ''
                }
              >
                Subir Liquidación
              </Sidebar.Item>
              <Sidebar.Item
                as={Link}
                to="/liquidacion/list"
                icon={HiFolderOpen}
                className={
                  '/liquidacion/list' === currentPage
                    ? 'bg-gray-100 dark:bg-gray-700'
                    : ''
                }
              >
                Liquidaciones
              </Sidebar.Item>
              <LogoutButton />
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </div>
      </div>
    </Sidebar>
  )
}

export default ExampleSidebar
