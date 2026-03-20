import { GridRect } from "../../../../core/types/shared/common"
import { BaseData } from "../../../../core/types/shared/data"

export interface LayoutData extends BaseData {
    columnCount: number
    rowCount: number
}

export interface LayoutSectionData extends BaseData {
    name: string
    position: GridRect;
}