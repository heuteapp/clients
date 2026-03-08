import { LayoutRegistry } from "./layout.registry"

export interface HeuteLayoutData {
  columnCount: number
  rowCount: number
  sections: LayoutSectionData[]
}
export interface LayoutSectionData {
  id: string
  colIndex: number
  rowIndex: number
  colSpan: number
  rowSpan: number
}

//

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

//

export interface LayoutAnalyze {
  sectionCount : {
    horizontal: number,
    vertical: number
  }
}

export interface LayoutMeasurements {
    cellCount: {
      horizontal: number,
      vertical: number
    },
    cellSize: {
      full: number,
      inner: number,
      compact: number,
    },
    containerSize: {
      width: number,
      height: number
    }
}