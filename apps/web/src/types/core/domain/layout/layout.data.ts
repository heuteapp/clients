import { GridRect } from "../../../shared/common"
import { BaseData } from "../../../shared/data"

export interface LayoutData extends BaseData {
    columnCount: number
    rowCount: number
}

export interface LayoutSectionData extends BaseData {
    name: string
    position: GridRect;
}