export interface LayoutMeasurements {
    sectionCount : LayoutSectionCountMeasurements
    cellCount: LayoutCellCountMeasurements
    cellSize: LayoutCellSizeMeasurements
    containerSize: LayoutContainerSizeMeasurements
}

export interface LayoutSectionCountMeasurements {
    horizontal: number
    vertical: number
}

export interface LayoutCellCountMeasurements {
    horizontal: number
    vertical: number
}

export interface LayoutCellSizeMeasurements {
    full: number
    inner: number
    compact: number
}

export interface LayoutContainerSizeMeasurements {
    width: number
    height: number
}