import { GridDimensions } from "@/src/types/shared/common"
import { LayoutSectionData } from "../../../types/layout/data"

export interface LayoutMeasurements {
    sectionCount : LayoutSectionCountMeasurements
    cellCount: LayoutCellCountMeasurements
    cellSize: LayoutCellSizeMeasurements
    gridSize: LayoutGridSizeMeasurements
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

export interface LayoutGridSizeMeasurements {
    maxWidth: number
    maxHeight: number
}

export interface LayoutContainerSizeMeasurements {
    width: number
    height: number
}

//

export interface LayoutMeasurementsParams {
    layoutRef: React.RefObject<HTMLDivElement | null>
    gridDimensions: GridDimensions
    sections: LayoutSectionData[]
    padding: number
}