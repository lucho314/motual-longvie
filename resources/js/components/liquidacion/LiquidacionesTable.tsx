import { FC } from 'react'
import { Table } from 'flowbite-react'
import { Liquidacion } from '@/interfaces/Liquidacion'
import { getVisibleColumns } from '@/utils/getVisibleColumns'

type props = {
  liquidaciones: Liquidacion[]
}

const LiquidacionesTable: FC<props> = ({ liquidaciones }) => {
  // Filtrar las columnas visibles
  const columnasVisibles = getVisibleColumns(liquidaciones || [])

  return (
    <div className="overflow-auto max-h-[600px]">
      <Table className="min-w-[1500px] text-sm">
        <Table.Head className="bg-gray-100 dark:bg-gray-700 sticky">
          <Table.HeadCell className="sticky left-0 z-10 bg-gray-100 dark:bg-gray-700">
            Socio
          </Table.HeadCell>
          {/* Mapear las columnas visibles a las celdas del encabezado */}
          {columnasVisibles.map((col) => (
            <Table.HeadCell key={col.key}>{col.label}</Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="bg-white dark:bg-gray-800 divide-y dark:divide-gray-700">
          {liquidaciones?.map((liq) => (
            <Table.Row
              key={liq.legajo}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Table.Cell className="sticky left-0 z-0 bg-white dark:bg-gray-800">
                {liq.socioNombre}
              </Table.Cell>
              {/* Mapear las columnas visibles a las celdas de las filas */}
              {columnasVisibles.map((col) => (
                <Table.Cell key={col.key}>
                  {liq[col.key as keyof Liquidacion] as string}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

export default LiquidacionesTable
