import { columnas } from '@/constants/columnasLiquidacion'
import { getVisibleColumns } from '@/utils/getVisibleColumns'
import { DetalleLiquidacion } from '@/interfaces/DetalleLiquidacion'
import { Checkbox, Table } from 'flowbite-react'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEye } from 'react-icons/fa'

type params = {
  detallLiquidacion: DetalleLiquidacion[] | undefined
  isLoading?: boolean
  onSelectionChange: (retenciones_id: number[]) => void
}

const DetalleLiquidacionTable: FC<params> = ({
  detallLiquidacion,
  isLoading,
  onSelectionChange
}) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const handleCheckboxChange = (id: number, checked: boolean) => {
    let updatedIds = checked
      ? [...selectedIds, id]
      : selectedIds.filter((itemId) => itemId !== id)
    setSelectedIds(updatedIds)
    onSelectionChange(updatedIds)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="overflow-auto max-h-[600px]">
      <Table className="min-w-[1500px] text-sm">
        <Table.Head className="bg-gray-100 dark:bg-gray-700 sticky">
          <Table.HeadCell className="sticky left-0 z-10 bg-gray-100 dark:bg-gray-700">
            Seleccionar
          </Table.HeadCell>
          <Table.HeadCell className="left-0 z-10 bg-gray-100 dark:bg-gray-700  top-0">
            Socio
          </Table.HeadCell>
          <Table.HeadCell className="left-0 z-10 bg-gray-100 dark:bg-gray-700  top-0">
            Total
          </Table.HeadCell>
          <Table.HeadCell className="left-0 z-10 bg-gray-100 dark:bg-gray-700  top-0">
            Fecha de alta
          </Table.HeadCell>
          <Table.HeadCell className="left-0 z-10 bg-gray-100 dark:bg-gray-700  top-0">
            Ver liquidacion
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="bg-white dark:bg-gray-800 divide-y dark:divide-gray-700">
          {/* Mapea cada fila de detallLiquidacion */}
          {detallLiquidacion?.map((liq) => (
            <Table.Row
              key={liq.id}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Table.Cell className="w-4 p-4 sticky">
                <Checkbox
                  id={`checkbox-${liq.id}`}
                  onChange={(e) =>
                    handleCheckboxChange(liq.id, e.target.checked)
                  }
                />
              </Table.Cell>
              <Table.Cell>{liq.socio.nombre}</Table.Cell>
              <Table.Cell>{liq.total}</Table.Cell>
              <Table.Cell>{liq.created_at}</Table.Cell>
              <Table.Cell>
                <Link
                  to={`/liquidacion/${liq.id}/detalle`}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-info rounded hover:bg-info/90 dark:bg-gray-700 dark:text-white"
                  title="Ver liquidacion"
                >
                  <FaEye />
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

export default DetalleLiquidacionTable
