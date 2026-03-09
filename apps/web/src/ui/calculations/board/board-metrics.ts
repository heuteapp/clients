import { BoardMetrics } from "@/src/ui/types/board/board.dom";
import { BoardRegistry } from "@/src/ui/registries/board.registry.types";
import { calculateGridCellSize } from "@/src/ui/calculations/layout/grid-cell-size";
import { calculateSectionContainerSize } from "@/src/ui/calculations/layout/section-container-size";
import { calculateSectionsCount } from "../layout/sections-count";
import { LayoutSectionProps } from "../../types/layout/layout.props";

export function calculateBoardMetrics(registry: BoardRegistry) : BoardMetrics | undefined {
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

    const layoutSectionContainerSize = calculateSectionContainerSize(layoutGridCellsCount, { full: 0, inner: 0, compact: 0 });
    const layoutGridCellSize = calculateGridCellSize(clientWidth, clientHeight, layoutGridCellsCount, padding);
    const layoutGridSize = {
        width: layoutGridCellsCount.horizontal * layoutGridCellSize.inner,
        height: layoutGridCellsCount.vertical * layoutGridCellSize.inner
    }

    return {
        layoutSectionsCount,
        layoutGridCellsCount,
        layoutGridCellSize,
        layoutGridSize,
        layoutSectionContainerSize
    };
}