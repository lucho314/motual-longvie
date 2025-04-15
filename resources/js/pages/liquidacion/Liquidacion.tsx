import Loader from '@/components/ui/loader'
import { campos } from '@/constants/columnasLiquidacion'
import { useLiquidacion } from '@/hooks/useLiquidacion'
import NavbarSidebarLayout from '@/layouts/navbar-sidebar'
import React from 'react'
import { useParams } from 'react-router'

const Liquidacion = () => {
  const { liquidacionId } = useParams<{ liquidacionId: string }>()

  const { data: liquidacion } = useLiquidacion({
    liquidacionId: liquidacionId ? Number(liquidacionId) : undefined
  })

  if (!liquidacion) return <Loader />

  const { periodo, id, socio, ...onlyLiquidacion } = liquidacion || {}

  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="bg-gray-900  min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xl">
          <h1 className="text-2xl font-semibold text-blue-600 mb-4">
            Hola {liquidacion?.socio.nombre}
          </h1>
          <p className="text-base text-gray-800 mb-4">
            Este es el detalle de tu liquidación del período{' '}
            <strong>{liquidacion?.periodo}</strong>.
          </p>

          <div className="text-gray-600 font-medium mt-6 mb-2">
            Socio #{liquidacion?.socio.legajo}
          </div>
          <ul className="list-none pl-0 text-sm text-gray-700">
            {Object.entries(onlyLiquidacion)
              .filter(([_, valor]) => Number(valor) !== 0)
              .map(([campo, valor]) => (
                <li key={campo} className="mb-2">
                  <strong>
                    {campo
                      .replace(/_/g, ' ')
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                    :
                  </strong>{' '}
                  $
                  {Number(valor).toLocaleString('es-AR', {
                    minimumFractionDigits: 2
                  })}
                </li>
              ))}
          </ul>

          <div className="mt-8 text-sm text-gray-500">
            <p>Gracias por tu confianza.</p>
            <p>Atentamente,</p>
            <p>El equipo de Asociación Mutual Personal Longvie Paraná</p>
          </div>
        </div>
      </div>
    </NavbarSidebarLayout>
  )
}

export default Liquidacion
