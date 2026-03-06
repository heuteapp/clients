export interface HeuteLayoutData {
  columnCount: number
  rowCount: number
  sections: LayoutSectionData[]
}

export interface LayoutSectionData {
  colIndex: number
  rowIndex: number
  colSpan: number
  rowSpan: number
}

//

export interface LayoutContext {
  analyze: LayoutAnalyze
  measurements: LayoutMeasurements
}

export interface LayoutAnalyze {
  sectionCount : {
    horizontal: number,
    vertical: number
  }
}

export interface LayoutMeasurements {
  cellSize: {
    full: number,
    inner: number
  }
}

export interface LayoutMeasurementsParams {
  containerRef: React.RefObject<HTMLDivElement | null>
  columnCount: number
  rowCount: number
  analyze: LayoutAnalyze
  padding: number
}