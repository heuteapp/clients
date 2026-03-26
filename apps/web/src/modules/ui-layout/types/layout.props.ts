import { LayoutEntity, LayoutSectionEntity } from "@/src/modules/ui-layout/types/layout.entity";

export interface LayoutRootProps extends LayoutEntity {

}

export interface LayoutSectionProps extends LayoutSectionEntity {

}

export interface LayoutGridProps  {
    sectionId: string,
    colSpan: number,
    rowSpan: number,
}