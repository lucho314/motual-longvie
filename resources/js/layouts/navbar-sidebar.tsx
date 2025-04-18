import type { FC, PropsWithChildren } from 'react'
import Navbar from '../components/navbar'
import Sidebar from '../components/sidebar'
import MobileBottomNav from '@/components/ui/MobileBottomNav'

interface NavbarSidebarLayoutProps {
  isFooter?: boolean
}

const NavbarSidebarLayout: FC<PropsWithChildren<NavbarSidebarLayoutProps>> =
  function ({ children, isFooter = true }) {
    return (
      <>
        <Navbar />
        <div className="flex">
          {/* Desktop sidebar */}
          <div className="hidden md:block">
            <Sidebar />
          </div>

          {/* Main content */}
          <MainContent isFooter={isFooter}>{children}</MainContent>
        </div>

        {/* Mobile bottom nav */}
        <div className="md:hidden fixed bottom-0 left-0 w-full z-50">
          <MobileBottomNav />
        </div>
      </>
    )
  }

const MainContent: FC<PropsWithChildren<NavbarSidebarLayoutProps>> = function ({
  children,
  isFooter
}) {
  return (
    <main className="relative h-full w-full overflow-y-auto bg-gray-50 dark:bg-gray-900 lg:ml-64">
      {children}
      {isFooter && (
        <div className="mx-4 mt-4">
          <MainContentFooter />
        </div>
      )}
    </main>
  )
}

const MainContentFooter: FC = function () {
  return (
    <>
      <p className="my-8 text-center text-sm text-gray-500 dark:text-gray-300">
        &copy; 2025 Mutual Longvie. Todos los derechos reservados.
      </p>
    </>
  )
}

export default NavbarSidebarLayout
