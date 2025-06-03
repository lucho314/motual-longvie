import Loader from '@/components/ui/loader'
import { campos } from '@/constants/columnasLiquidacion'
import { useLiquidacion } from '@/hooks/useLiquidacion'
import NavbarSidebarLayout from '@/layouts/navbar-sidebar'
import { Breadcrumb, Button } from 'flowbite-react'
import React from 'react'
import { BiMailSend } from 'react-icons/bi'
import { useParams } from 'react-router'
import { useReenviarLiquidacion } from './useReenviarLiquidacion'
import toast from 'react-hot-toast'
import { HiHome } from 'react-icons/hi'

const Liquidacion = () => {
  const { liquidacionId } = useParams<{ liquidacionId: string }>()
  const { mutate: reenviarLiquidacion, isPending } = useReenviarLiquidacion()

  const { data: liquidacion } = useLiquidacion({
    liquidacionId: liquidacionId ? Number(liquidacionId) : undefined
  })

  if (!liquidacion) return <Loader />

  const { periodo, id, socio, ...onlyLiquidacion } = liquidacion || {}

  const handleReenviar = () => {
    reenviarLiquidacion(
      { retenciones_id: [liquidacionId ? +liquidacionId : 0] },
      {
        onSuccess: (res) => {
          toast.success('Liquidación reenviada con éxito')
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
        </div>
      </div>
      <div className="bg-gray-900  flex justify-center p-4">
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
      <div className="justify-center flex">
        <Button color="success" onClick={handleReenviar}>
          <div className="flex items-center gap-x-3">
            <BiMailSend />
            <span className="dark:text-white">Reenviar liquidacion</span>
            <span className="dark:text-white"></span>
          </div>
        </Button>
      </div>
    </NavbarSidebarLayout>
  )
}

export default Liquidacion
