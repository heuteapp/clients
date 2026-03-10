import { LayoutGridCellsCount, LayoutGridCellSize, LayoutSectionContainerSize } from "@/src/ui/types/layout/layout.metrics";

export function calculateSectionContainerSize(cellsCount: LayoutGridCellsCount, cellSize: LayoutGridCellSize) : LayoutSectionContainerSize {
    const width = cellsCount.horizontal * cellSize.full;
    const height = cellsCount.vertical * cellSize.full;

    return {
        width,
        height
    }
}