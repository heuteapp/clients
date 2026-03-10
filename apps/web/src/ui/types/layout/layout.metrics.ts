export type LayoutMetricsValue = {
    sectionsCount: LayoutSectionsCount
    gridCellsCount: LayoutGridCellsCount

    sectionContainerSize: LayoutSectionContainerSize
    gridSize: LayoutGridSize
    gridCellSize: LayoutGridCellSize
}

export interface LayoutSectionsCount {
    horizontal: number
    vertical: number
}

export interface LayoutGridCellsCount {
    horizontal: number
    vertical: number
}

export interface LayoutSectionContainerSize {
    width: number
    height: number
}

export interface LayoutGridSize {
    width: number
    height: number
}

export interface LayoutGridCellSize {
    full: number
    inner: number
    compact: number
}