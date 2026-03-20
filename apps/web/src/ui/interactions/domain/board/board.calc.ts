import { GridPosition, GridSize, Pointer } from "@/src/types/shared/common"
import { clamp } from "@/src/core/utils/shared/clamp"

export function calculateCardPositionByPointer(
    localPointer: Pointer,
    cellSize: number,
    cardSize: GridSize,
    sectionSize: GridSize
) : GridPosition {
    const centeredX = localPointer.x - (cardSize.colSpan * cellSize) / 2
    const centeredY = localPointer.y - (cardSize.rowSpan * cellSize) / 2

    const rawCol = Math.round(centeredX / cellSize) + 1
    const rawRow = Math.round(centeredY / cellSize) + 1

    const maxRow = sectionSize.rowSpan - cardSize.rowSpan + 1
    const maxCol = sectionSize.colSpan - cardSize.colSpan + 1

    const rowIndex = clamp(rawRow, 1, maxRow)
    const colIndex = clamp(rawCol, 1, maxCol)

    return { rowIndex, colIndex }
}