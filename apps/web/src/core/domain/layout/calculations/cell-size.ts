import { LayoutCellCountMeasurements, LayoutCellSizeMeasurements } from "../../../../types/layout/dom";

export function calculateCellSize(
    containerWidth: number, 
    containerHeight: number, 
    cellCount: LayoutCellCountMeasurements,
    padding: number
) : LayoutCellSizeMeasurements {

    const colCount = cellCount.horizontal;
    const rowCount = cellCount.vertical;

    const full = Math.min(
        containerWidth / colCount,
        containerHeight / rowCount
    );

    const inner = Math.min(
        (containerWidth - ((colCount + 4) * padding * 2)) / colCount,
        (containerHeight - ((rowCount + 4) * padding * 2)) / rowCount
    );

    const compact = inner * 0.9;

    return {
        full,
        inner,
        compact
    }
}