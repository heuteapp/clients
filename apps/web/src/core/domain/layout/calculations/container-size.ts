import { LayoutCellCountMeasurements, LayoutContainerSizeMeasurements } from "../../../../types/layout/dom";

export function calculateContainerSize(cellCount: LayoutCellCountMeasurements, cellSize: number) : LayoutContainerSizeMeasurements {
    const width = cellCount.horizontal * cellSize;
    const height = cellCount.vertical * cellSize;

    return {
        width,
        height
    }
}