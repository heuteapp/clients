import { LayoutContainerSize, LayoutGridCellsCount, LayoutGridCellSize, LayoutGridSize, LayoutSectionsCount } from "@/src/ui/types/layout/dom"

export type BoardMetrics = {
    layoutSectionsCount: LayoutSectionsCount
    layoutGridCellsCount: LayoutGridCellsCount

    layoutContainerSize: LayoutContainerSize
    layoutGridSize: LayoutGridSize
    layoutGridCellSize: LayoutGridCellSize
}