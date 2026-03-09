import { LayoutSectionContainerSize, LayoutGridCellsCount, LayoutGridCellSize, LayoutGridSize, LayoutSectionsCount } from "@/src/ui/types/layout/LayoutDom";

export type BoardMetrics = {
    layoutSectionsCount: LayoutSectionsCount
    layoutGridCellsCount: LayoutGridCellsCount

    layoutSectionContainerSize: LayoutSectionContainerSize
    layoutGridSize: LayoutGridSize
    layoutGridCellSize: LayoutGridCellSize
}