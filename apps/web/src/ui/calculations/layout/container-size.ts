import { LayoutGridCellsCount, LayoutGridCellSize } from "@/src/ui/types/layout/LayoutDom";

export function calculateContainerSize(cellsCount: LayoutGridCellsCount, cellSize: LayoutGridCellSize) : { width: number; height: number } {
    const width = cellsCount.horizontal * cellSize.full;
    const height = cellsCount.vertical * cellSize.full;

    return {
        width,
        height
    }
}