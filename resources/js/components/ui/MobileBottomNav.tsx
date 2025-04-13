// components/MobileBottomNav.tsx
import { Link, useLocation } from 'react-router-dom'
import { HiUsers, HiDocumentReport, HiFolderOpen } from 'react-icons/hi'
import { FC } from 'react'

const MobileBottomNav: FC = () => {
  const location = useLocation()
  const currentPage = location.pathname

  const navItems = [
    { to: '/socios/list', icon: <HiUsers />, label: 'Socios' },
    { to: '/liquidacion/upload', icon: <HiDocumentReport />, label: 'Subir' },
    { to: '/liquidacion/list', icon: <HiFolderOpen />, label: 'Listar' }
  ]

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-inner flex justify-around items-center py-2">
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={`flex flex-col items-center text-sm ${
            currentPage === item.to ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          <div className="text-xl">{item.icon}</div>
        </Link>
      ))}
    </nav>
  )
}

export default MobileBottomNav
