import { LayoutEntity, LayoutSectionEntity } from "@/src/modules/ui-layout/types/layout.entity";
import { Identifier } from "@/src/types/shared/core/data";

export interface LayoutRootProps extends LayoutEntity {

}

export interface LayoutSectionProps extends LayoutSectionEntity {

}

export interface LayoutGridProps  {
    sectionId: string,
    colSpan: number,
    rowSpan: number,
}