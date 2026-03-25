import { LayoutData, LayoutSectionData } from "@/src/modules/layout/types/layout.data";
import { Identifier } from "@/src/types/shared/core/data";

export interface LayoutRootProps extends LayoutData {

}

export interface LayoutSectionProps extends LayoutSectionData {

}

export interface LayoutGridProps  {
    sectionId: Identifier,
    colSpan: number,
    rowSpan: number,
}