import { GridRect } from "../../../shared/core/common"
import { BaseData } from "../../../shared/core/data"

export interface LayoutData extends BaseData {
    columnCount: number
    rowCount: number
}

export interface LayoutSectionData extends BaseData {
    name: string
    position: GridRect;
}