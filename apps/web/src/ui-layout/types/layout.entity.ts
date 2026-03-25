import { LayoutData, LayoutSectionData } from "@/src/layout/types/layout.types";
import { UIEntity } from "@/src/shared/types/entity.types"

export interface LayoutEntity extends UIEntity, LayoutData {

}

export interface LayoutSectionEntity extends UIEntity, LayoutSectionData {

}