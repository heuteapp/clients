export interface LayoutMeasurements {
    sectionCount : LayoutSectionCountMeasurements,
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

export interface LayoutSectionCountMeasurements {
    horizontal: number,
    vertical: number
}