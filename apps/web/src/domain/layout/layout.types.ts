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
    }
    cellSize: {
        full: number,
        inner: number
    }
}