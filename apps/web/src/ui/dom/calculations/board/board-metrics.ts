import { BoardMetricsValue } from "@/src/ui/types/board/board.metrics";
import { BoardRegistry } from "@/src/ui/registries/board.registry.types";
import { calculateGridCellSize } from "@/src/ui/dom/calculations/layout/grid-cell-size";
import { calculateSectionContainerSize } from "@/src/ui/dom/calculations/layout/section-container-size";
import { calculateSectionsCount } from "@/src/ui/dom/calculations/layout/sections-count";
import { LayoutSectionProps } from "@/src/ui/types/layout/layout.props";

export function calculateBoardMetrics(registry: BoardRegistry) : BoardMetricsValue | undefined {
    const layout = registry.layout;

    const layoutProps = layout.props;
    if(!layoutProps) return;

    const layoutElement = layout.ref?.current;
    if (!layoutElement) return;

    const { clientWidth, clientHeight } = layoutElement;
    const padding = 6;

    const sections = registry.getLayoutSections();
    if(!sections) return;

    const sectionDatas = sections.map(section => section.props) as LayoutSectionProps[];
    if(sectionDatas.some(props => !props)) return;

    const layoutSectionsCount = calculateSectionsCount(sectionDatas);
    const layoutGridCellsCount = {
        horizontal: layoutProps.columnCount,
        vertical: layoutProps.rowCount
    };
    
    const layoutGridCellSize = calculateGridCellSize(clientWidth, clientHeight, layoutGridCellsCount, padding);
    const layoutGridSize = {
        width: layoutGridCellsCount.horizontal * layoutGridCellSize.inner,
        height: layoutGridCellsCount.vertical * layoutGridCellSize.inner
    }

    const layoutSectionContainerSize = calculateSectionContainerSize(layoutGridCellsCount, layoutGridCellSize);
    
    return {
        layoutSectionsCount,
        layoutGridCellsCount,
        layoutGridCellSize,
        layoutGridSize,
        layoutSectionContainerSize
    };
}