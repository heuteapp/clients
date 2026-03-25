import { GridRect } from "@/src/types/shared/core/common"
import { BaseData } from "@/src/types/shared/core/data"

export interface LayoutEntity extends BaseData {
    columnCount: number
    rowCount: number
}

export interface LayoutSectionEntity extends BaseData {
    name: string
    position: GridRect;
}