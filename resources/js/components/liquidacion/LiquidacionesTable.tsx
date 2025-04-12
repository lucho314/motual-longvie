import { FC } from 'react'
import { Table } from 'flowbite-react'
import { Liquidacion } from '@/interfaces/Liquidacion'

type props = {
  liquidaciones: Liquidacion[]
}

const LiquidacionesTable: FC<props> = ({ liquidaciones }) => {
  return (
    <div className="overflow-auto max-h-[600px]">
      <Table className="min-w-[1500px]  text-sm">
        <Table.Head className="bg-gray-100 dark:bg-gray-700 sticky">
          <Table.HeadCell className="sticky left-0 z-10 bg-gray-100 dark:bg-gray-700">
            Socio
          </Table.HeadCell>
          <Table.HeadCell>Cuota</Table.HeadCell>
          <Table.HeadCell>SS Adm</Table.HeadCell>
          <Table.HeadCell>Fcia M. Luisa</Table.HeadCell>
          <Table.HeadCell>Fcia Amur</Table.HeadCell>
          <Table.HeadCell>Fcia La Botica</Table.HeadCell>
          <Table.HeadCell>OSECA</Table.HeadCell>
          <Table.HeadCell>Villegas</Table.HeadCell>
          <Table.HeadCell>Luz y Fza</Table.HeadCell>
          <Table.HeadCell>Flama</Table.HeadCell>
          <Table.HeadCell>Fontana</Table.HeadCell>
          <Table.HeadCell>Moto City</Table.HeadCell>
          <Table.HeadCell>Transporte</Table.HeadCell>
          <Table.HeadCell>Mutual Sol</Table.HeadCell>
          <Table.HeadCell>Viandas</Table.HeadCell>
          <Table.HeadCell>Seguro</Table.HeadCell>
          <Table.HeadCell>Uso Ins CD</Table.HeadCell>
          <Table.HeadCell>Cantina CD</Table.HeadCell>
          <Table.HeadCell>Saldo</Table.HeadCell>
          <Table.HeadCell>Interés Saldo</Table.HeadCell>
          <Table.HeadCell>Subtotal</Table.HeadCell>
          <Table.HeadCell>G. Bancario</Table.HeadCell>
          <Table.HeadCell>Total</Table.HeadCell>
        </Table.Head>
        <Table.Body className="bg-white dark:bg-gray-800 divide-y dark:divide-gray-700">
          {liquidaciones.map((liq) => (
            <Table.Row
              key={liq.legajo}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Table.Cell className="sticky left-0 z-0 bg-white dark:bg-gray-800">
                {liq.socioNombre}
              </Table.Cell>
              <Table.Cell>{liq.cuota}</Table.Cell>
              <Table.Cell>{liq.ss_adm}</Table.Cell>
              <Table.Cell>{liq.fcia_maria_luisa}</Table.Cell>
              <Table.Cell>{liq.fcia_amur}</Table.Cell>
              <Table.Cell>{liq.fcia_la_botica}</Table.Cell>
              <Table.Cell>{liq.oseca}</Table.Cell>
              <Table.Cell>{liq.villegas}</Table.Cell>
              <Table.Cell>{liq.luz_y_fza}</Table.Cell>
              <Table.Cell>{liq.flama}</Table.Cell>
              <Table.Cell>{liq.fontana}</Table.Cell>
              <Table.Cell>{liq.moto_city}</Table.Cell>
              <Table.Cell>{liq.transporte}</Table.Cell>
              <Table.Cell>{liq.mutual_sol}</Table.Cell>
              <Table.Cell>{liq.viandas}</Table.Cell>
              <Table.Cell>{liq.seguro}</Table.Cell>
              <Table.Cell>{liq.uso_ins_cd}</Table.Cell>
              <Table.Cell>{liq.cantina_cd}</Table.Cell>
              <Table.Cell>{liq.saldo}</Table.Cell>
              <Table.Cell>{liq.interes_saldo}</Table.Cell>
              <Table.Cell>{liq.sub_total}</Table.Cell>
              <Table.Cell>{liq.gasto_bancario}</Table.Cell>
              <Table.Cell>{liq.total}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

export default LiquidacionesTable
