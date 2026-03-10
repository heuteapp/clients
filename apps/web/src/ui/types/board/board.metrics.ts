import { LayoutSectionContainerSize, LayoutGridCellsCount, LayoutGridCellSize, LayoutGridSize, LayoutSectionsCount } from "@/src/ui/types/layout/layout.dom";

export type BoardMetrics = React.RefObject<BoardMetricsValue | null>

export type BoardMetricsValue = {
    layoutSectionsCount: LayoutSectionsCount
    layoutGridCellsCount: LayoutGridCellsCount

    layoutSectionContainerSize: LayoutSectionContainerSize
    layoutGridSize: LayoutGridSize
    layoutGridCellSize: LayoutGridCellSize
}