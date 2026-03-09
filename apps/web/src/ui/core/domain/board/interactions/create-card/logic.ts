import { clamp } from "@/src/shared/logic"
import { CardCreateComputeInput, CardCreateComputeResult } from "./types"

export function computeCardCreatePosition(
    input: CardCreateComputeInput
) : CardCreateComputeResult {

    const {
        pointer,
        rectLeft,
        rectTop,
        cellSize,
        cardRows,
        cardCols,
        sectionRowSpan,
        sectionColSpan
    } = input

    const mouseX = pointer.x - rectLeft
    const mouseY = pointer.y - rectTop

    const centeredX = mouseX - (cardCols * cellSize) / 2
    const centeredY = mouseY - (cardRows * cellSize) / 2

    const rawCol = Math.round(centeredX / cellSize) + 1
    const rawRow = Math.round(centeredY / cellSize) + 1

    const maxRow = sectionRowSpan - cardRows + 1
    const maxCol = sectionColSpan - cardCols + 1

    const rowIndex = clamp(rawRow, 1, maxRow)
    const colIndex = clamp(rawCol, 1, maxCol)

    return { rowIndex, colIndex }
}