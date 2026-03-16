import { HeuteLayoutData, LayoutSectionData } from "@/src/core/types/domain/layout/layout.data";
import { Identifier } from "@/src/core/types/shared/data";

export interface LayoutProps extends HeuteLayoutData {

}

export interface LayoutSectionProps extends LayoutSectionData {

}

export interface LayoutGridProps  {
    sectionId: Identifier,
    colSpan: number,
    rowSpan: number,
}