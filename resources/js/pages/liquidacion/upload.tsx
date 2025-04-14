import LiquidacionesTable from '../../components/liquidacion/LiquidacionesTable'
import UploadExcelModal from '../../components/liquidacion/UploadExcelModal'
import { Breadcrumb, Button } from 'flowbite-react'
import NavbarSidebarLayout from '../../layouts/navbar-sidebar'
import { FC, useEffect, useState } from 'react'
import { HiDocumentAdd, HiHome, HiUpload } from 'react-icons/hi'
import { Liquidacion } from '@/interfaces/Liquidacion'
import { parseExcelToLiquidaciones } from '@/utils/parseExcel'
import { BiMailSend } from 'react-icons/bi'
import { useCreateLiquidacion } from '@/hooks/useCreateLiquidacion'
import toast from 'react-hot-toast'

const UploadPage: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [liquidaciones, setLiquidaciones] = useState<Liquidacion[]>([])
  const [periodo, setPeriodo] = useState('')
  const [isSending, setIsSending] = useState(false)

  const createLiquidacion = useCreateLiquidacion()

  useEffect(() => {
    document.title = 'Nueva Liquidacion | Mutual Longvie'
  }, [])

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  const handleUpload = async (file: File) => {
    try {
      const data = await parseExcelToLiquidaciones(file)
      setLiquidaciones(data)
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error al leer el archivo Excel', error)
    }
  }

  const handleSendEmail = async () => {
    console.log('liquidaciones', liquidaciones)
    if (!liquidaciones.length) return
    setIsSending(true)
    try {
      await createLiquidacion.mutateAsync({
        liquidaciones,
        periodo
      })
      setLiquidaciones([])
      setPeriodo('')
      toast.success(
        'Archivo guardado correctamente, los correos seran enviados...'
      )
    } catch (error) {
      console.error('Error al enviar el correo', error)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="w-full block items-center justify-between  bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-1 ">
          <Breadcrumb className="mb-4">
            <Breadcrumb.Item href="#">
              <div className="flex items-center gap-x-3">
                <HiHome className="text-xl" />
                <span className="dark:text-white">Home</span>
              </div>
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/upload">Liquidaciones</Breadcrumb.Item>
            <Breadcrumb.Item>Subir</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Subir archivo de liquidacion
          </h1>
        </div>

        <div className="ml-auto flex items-center space-x-2 sm:space-x-3">
          <Button
            color="success"
            disabled={!liquidaciones.length || isSending}
            className={
              liquidaciones.length && !isSending ? 'animate-pulse' : ''
            }
            onClick={handleSendEmail}
          >
            <div className="flex items-center gap-x-3">
              <BiMailSend />
              <span className="dark:text-white">
                {isSending ? 'Enviando...' : 'Guardar y enviar al correo'}
              </span>
            </div>
          </Button>
        </div>
      </div>

      <div className="w-full block items-center justify-between  bg-white pl-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-4 ">
          <h1 className="text-xl  text-gray-900 dark:text-white sm:text-2xl">
            Periodo: {periodo}
          </h1>
        </div>
      </div>

      <div className="flex flex-col min-h-[400px] relative">
        {!liquidaciones.length && (
          <div className="absolute inset-0 z-10 flex justify-center items-center  bg-white/70 dark:bg-gray-800/70">
            <div className="justify-content-center items-center p-8 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 rounded-2xl shadow-lg text-center space-y-4 sm:flex sm:flex-col">
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Aún no se ha cargado un archivo de liquidacion.
              </p>

              {/* Input para el período */}
              <div className="flex flex-col items-start gap-2">
                <label
                  htmlFor="periodo"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Seleccionar período (mes y año)
                </label>
                <input
                  type="month"
                  id="periodo"
                  value={periodo}
                  onChange={(e) => setPeriodo(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>

              <Button onClick={handleOpenModal} disabled={!periodo}>
                <div className="flex items-center gap-x-3">
                  <HiDocumentAdd className="text-xl" />
                  <span>Cargar Excel</span>
                </div>
              </Button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <LiquidacionesTable liquidaciones={liquidaciones} />
            </div>
          </div>
        </div>
      </div>

      <UploadExcelModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onUpload={handleUpload}
      />
    </NavbarSidebarLayout>
  )
}

export default UploadPage
