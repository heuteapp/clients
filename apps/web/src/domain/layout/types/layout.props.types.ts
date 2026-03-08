import { LayoutRegistry } from "./layout.registry.types"
import { HeuteLayoutData, LayoutSectionData } from "./layout.data.types"

export interface HeuteLayoutProps extends HeuteLayoutData {
  registry?: LayoutRegistry
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