import { UIEntity } from "@/src/shared/types/entity.types"
import { GridRect } from "@/src/types/shared/core/common"

export interface LayoutEntity extends UIEntity {
    columnCount: number
    rowCount: number
}

export interface LayoutSectionEntity extends UIEntity {
    name: string
    position: GridRect;
}