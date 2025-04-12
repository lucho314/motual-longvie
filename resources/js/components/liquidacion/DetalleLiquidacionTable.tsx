import { columnas } from '@/constants/columnasLiquidacion'
import { getVisibleColumns } from '@/utils/getVisibleColumns'
import { DetalleLiquidacion } from '@/interfaces/DetalleLiquidacion'
import { Table } from 'flowbite-react'
import { FC } from 'react'

type params = {
  detallLiquidacion: DetalleLiquidacion[] | undefined
  isLoading?: boolean
}

const DetalleLiquidacionTable: FC<params> = ({
  detallLiquidacion,
  isLoading
}) => {
  if (isLoading) {
    return <div>Loading...</div>
  }

  // Filtrar las columnas visibles usando la función getVisibleColumns
  const columnasVisibles = getVisibleColumns(detallLiquidacion || [])

  return (
    <div className="overflow-auto max-h-[600px]">
      <Table className="min-w-[1500px] text-sm">
        <Table.Head className="bg-gray-100 dark:bg-gray-700 ">
          <Table.HeadCell className="sticky left-0 z-10 bg-gray-100 dark:bg-gray-700  top-0">
            Socio
          </Table.HeadCell>
          {/* Mapea las columnas visibles a las celdas de encabezado */}
          {columnasVisibles.map((col) => (
            <Table.HeadCell
              key={col.key}
              className="sticky left-0 z-10 bg-gray-100 dark:bg-gray-700  top-0"
            >
              {col.label}
            </Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="bg-white dark:bg-gray-800 divide-y dark:divide-gray-700">
          {/* Mapea cada fila de detallLiquidacion */}
          {detallLiquidacion?.map((liq) => (
            <Table.Row
              key={liq.legajo}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Table.Cell>{liq.socio.nombre}</Table.Cell>
              {/* Mapea cada columna visible para mostrar los valores */}
              {columnasVisibles.map((col) => (
                <Table.Cell key={col.key}>
                  {(liq as Record<string, any>)[col.key]}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

export default DetalleLiquidacionTable
