import { GridPosition } from "../../shared/common"
import { BaseData } from "../../shared/data"

export interface HeuteLayoutData extends BaseData {
    columnCount: number
    rowCount: number
}

export interface LayoutSectionData extends BaseData {
    name: string
    position: GridPosition;
}