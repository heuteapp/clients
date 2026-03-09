import { HeuteLayoutData, LayoutSectionData } from "@/src/types/layout/layout.data";

export interface HeuteLayoutProps extends HeuteLayoutData {

}

export interface LayoutSectionContainerProps {
    sections: LayoutSectionData[]
}

export interface LayoutSectionProps extends LayoutSectionData {
    padding: number
}

export interface LayoutGridProps  {
    sectionId: string,
    colSpan: number,
    rowSpan: number,
}

export interface LayoutGridCellProps {
    sectionId: string,
    rowIndex: number,
    colIndex: number,
}