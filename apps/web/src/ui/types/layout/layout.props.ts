import { HeuteLayoutData, LayoutSectionData } from "@/src/core/types/domain/layout/layout.data";
import { Identifier } from "@/src/core/types/shared/data";

export interface HeuteLayoutProps extends HeuteLayoutData {

}

export interface LayoutSectionContainerProps {
    sections: LayoutSectionData[]
}

export interface LayoutSectionProps extends LayoutSectionData {

}

export interface LayoutGridProps  {
    sectionId: Identifier,
    colSpan: number,
    rowSpan: number,
}

export interface LayoutGridCellProps {
    sectionId: Identifier,
    rowIndex: number,
    colIndex: number,
}