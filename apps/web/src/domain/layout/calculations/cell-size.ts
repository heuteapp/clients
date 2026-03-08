import { LayoutCellSizeMeasurements } from "../types/dom";

export function calculateCellSize(
    containerWidth: number, 
    containerHeight: number, 
    columnCount: number, 
    rowCount: number, 
    padding: number
) : LayoutCellSizeMeasurements {

    const full = Math.min(
        containerWidth / columnCount,
        containerHeight / rowCount
    );

    const inner = Math.min(
        (containerWidth - ((columnCount + 4) * padding * 2)) / columnCount,
        (containerHeight - ((rowCount + 4) * padding * 2)) / rowCount
    );

    const compact = inner * 0.9;

    return {
        full,
        inner,
        compact
    }
}