import { LayoutSectionContainerSize, LayoutGridCellsCount, LayoutGridCellSize, LayoutGridSize, LayoutSectionsCount } from "@/src/ui/types/layout/layout.dom";

export type BoardMetrics = {
    layoutSectionsCount: LayoutSectionsCount
    layoutGridCellsCount: LayoutGridCellsCount

    layoutSectionContainerSize: LayoutSectionContainerSize
    layoutGridSize: LayoutGridSize
    layoutGridCellSize: LayoutGridCellSize
}