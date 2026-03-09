import { Pointer } from "@/src/types/shared/common"

export interface CardCreateComputeInput {
    pointer: Pointer
    rectLeft: number
    rectTop: number
    cellSize: number
    cardRows: number
    cardCols: number
    sectionRowSpan: number
    sectionColSpan: number
}

export interface CardCreateComputeResult {
    rowIndex: number
    colIndex: number
}