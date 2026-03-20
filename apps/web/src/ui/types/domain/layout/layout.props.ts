import { LayoutData, LayoutSectionData } from "@/src/types/core/domain/layout/layout.data";
import { Identifier } from "@/src/core/types/shared/data";

export interface LayoutRootProps extends LayoutData {

}

export interface LayoutSectionProps extends LayoutSectionData {

}

export interface LayoutGridProps  {
    sectionId: Identifier,
    colSpan: number,
    rowSpan: number,
}