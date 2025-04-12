import { columnas } from '@/constants/columnasLiquidacion'
import { DetalleLiquidacion } from '@/interfaces/DetalleLiquidacion'
import { Liquidacion } from '@/interfaces/Liquidacion'

interface ColumnDefinition {
  key: string
  label: string
}

export const getVisibleColumns = (
  data: DetalleLiquidacion[] | Liquidacion[]
): ColumnDefinition[] => {
  return columnas.filter((col) =>
    data.some(
      (row) =>
        (row as DetalleLiquidacion)[col.key as keyof DetalleLiquidacion] !==
          '0' &&
        (row as DetalleLiquidacion)[col.key as keyof DetalleLiquidacion] !==
          null &&
        (row as DetalleLiquidacion)[col.key as keyof DetalleLiquidacion] !==
          '' &&
        (row as DetalleLiquidacion)[col.key as keyof DetalleLiquidacion] !==
          '0.00' &&
        (row as DetalleLiquidacion)[col.key as keyof DetalleLiquidacion] !== 0
    )
  )
}
