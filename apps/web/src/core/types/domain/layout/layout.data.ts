import { BaseData } from "../../shared/data"

export interface HeuteLayoutData extends BaseData {
    columnCount: number
    rowCount: number
}

export interface LayoutSectionData extends BaseData {
    name: string
    colIndex: number
    rowIndex: number
    colSpan: number
    rowSpan: number
}