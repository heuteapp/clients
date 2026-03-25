import { GridRect } from "@/src/types/shared/core/common"
import { BaseData } from "@/src/types/shared/core/data"

export interface LayoutData extends BaseData {
    columnCount: number
    rowCount: number
}

export interface LayoutSectionData extends BaseData {
    name: string
    position: GridRect;
}