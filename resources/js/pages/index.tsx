/* eslint-disable jsx-a11y/anchor-is-valid */
import type { FC } from 'react'
import NavbarSidebarLayout from '../layouts/navbar-sidebar'

const DashboardPage: FC = function () {
  return (
    <NavbarSidebarLayout>
      <div className="px-4 pt-6">
        <SalesThisWeek />
      </div>
    </NavbarSidebarLayout>
  )
}

const SalesThisWeek: FC = function () {
  return (
    <div className="h-96 rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Bienvenido a la aplicación de Mutual
      </h2>
    </div>
  )
}

export default DashboardPage
