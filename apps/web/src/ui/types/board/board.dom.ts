import { LayoutSectionContainerSize, LayoutGridCellsCount, LayoutGridCellSize, LayoutGridSize, LayoutSectionsCount } from "@/src/ui/types/layout/layout.dom";
import { BoardRegistry } from "@/src/ui/registries/board.registry.types";
import { GridDimensions } from "@/src/core/types/shared/common";
import { LayoutSectionData } from "@/src/core/types/domain/layout/layout.data";

export type BoardMetrics = {
    layoutSectionsCount: LayoutSectionsCount
    layoutGridCellsCount: LayoutGridCellsCount

    layoutSectionContainerSize: LayoutSectionContainerSize
    layoutGridSize: LayoutGridSize
    layoutGridCellSize: LayoutGridCellSize
}

export type BoardMetricsParams = {
    registry: BoardRegistry
    gridDimensions: GridDimensions
    sections: LayoutSectionData[]
    padding: number
}