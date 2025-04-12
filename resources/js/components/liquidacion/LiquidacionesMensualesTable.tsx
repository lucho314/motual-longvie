import { useLiquidacionesMensuales } from '@/hooks/useLiquidacionesMensuales'
import { Button, Table } from 'flowbite-react'
import { Loader } from 'lucide-react'
import { FC } from 'react'
import { FaEye } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const LiquidacionesMensualesTable: FC = () => {
  const { data, isLoading } = useLiquidacionesMensuales({
    page: 1,
    search: ''
  })
  if (isLoading) return <Loader />

  return (
    <Table className="text-sm">
      <Table.Head className="bg-gray-100 dark:bg-gray-700">
        <Table.HeadCell className="left-0 z-10 bg-gray-100 dark:bg-gray-700">
          Periodo
        </Table.HeadCell>
        <Table.HeadCell className="left-0 z-10 bg-gray-100 dark:bg-gray-700">
          Fecha de alta
        </Table.HeadCell>
        <Table.HeadCell className="left-0 z-10 bg-gray-100 dark:bg-gray-700">
          Usuario que carga
        </Table.HeadCell>
        <Table.HeadCell className="left-0 z-10 bg-gray-100 dark:bg-gray-700">
          ver
        </Table.HeadCell>
      </Table.Head>

      <Table.Body className="bg-white dark:bg-gray-800 divide-y dark:divide-gray-700">
        {data?.data.map((liq) => (
          <Table.Row
            key={liq.id}
            className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {liq.periodo}
            </Table.Cell>
            <Table.Cell>{liq.created_at}</Table.Cell>
            <Table.Cell>{liq.user?.name}</Table.Cell>
            <Table.Cell>
              <Link
                to={`/liquidacion/detalle/${liq.periodo}`}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-info rounded hover:bg-info/90 dark:bg-gray-700 dark:text-white"
              >
                <FaEye />
              </Link>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default LiquidacionesMensualesTable
