import { BoardRegistry } from "@/src/ui/registries/board.registry.types";
import { LayoutSectionData } from "@/src/core/types/domain/layout/layout.data";
import { LayoutSectionMetricsCount, LayoutSectionMetricsValue, LayoutMetricsValue } from "@/src/core/types/domain/layout/layout.metrics";

export function calculateLayoutMetrics(registry: BoardRegistry) : LayoutMetricsValue | undefined {
    const layout = registry.layout;
    
    const layoutProps = layout.props;
    if(!layoutProps) return;

    const layoutElement = layout.ref?.current;
    if (!layoutElement) return;

    const sections = registry.getLayoutSections();
    if(!sections) return;

    const metricsValue = {} as LayoutMetricsValue;
    const sectionDatas = sections.map(section => section.props) as LayoutSectionData[];
    if(sectionDatas.some(props => !props)) return;

    metricsValue.sectionCount = calculateLayoutSectionMetricsCount(sectionDatas);
    metricsValue.sectionValue = calculateLayoutSectionMetricsValue(layoutElement);

    return metricsValue;
}

export function calculateLayoutSectionMetricsCount(sections: LayoutSectionData[]): LayoutSectionMetricsCount {

    if (sections.length === 0) {
        return {
            horizontal: 0,
            vertical: 0
        }
    }

    let sectionCount = { horizontal: 0, vertical: 0 }
    {
        const maxRow = Math.max(...sections.map(s => s.position.rowIndex + s.position.rowSpan))
        const maxCol = Math.max(...sections.map(s => s.position.colIndex + s.position.colSpan))

        for (let row = 1; row <= maxRow; row++) {
            let count = 0

            for (const s of sections) {
                if (row >= s.position.rowIndex && row < s.position.rowIndex + s.position.rowSpan) {
                    count++
                }
            }

            sectionCount.horizontal = Math.max(sectionCount.horizontal, count)
        }

        for (let col = 1; col <= maxCol; col++) {
            let count = 0

            for (const s of sections) {
                if (col >= s.position.colIndex && col < s.position.colIndex + s.position.colSpan) {
                    count++
                }
            }

            sectionCount.vertical = Math.max(sectionCount.vertical, count)
        }
    }

    return sectionCount;
}

export function calculateLayoutSectionMetricsValue(layoutElement: HTMLElement): LayoutSectionMetricsValue {
    const { clientWidth: layoutWidth, clientHeight: layoutHeight } = layoutElement;

    const sectionMetricsValue = {} as LayoutSectionMetricsValue;

    return sectionMetricsValue;
}


/*

export function calculateLayoutMetrics(registry: BoardRegistry) : LayoutMetricsValue | undefined {
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

    const layoutSectionsCount = calculateLayoutSectionsCount(sectionDatas);
    const layoutGridCellsCount = {
        horizontal: layoutProps.columnCount,
        vertical: layoutProps.rowCount
    };
    
    const layoutGridCellSize = calculateLayoutGridCellSize(clientWidth, clientHeight, layoutGridCellsCount, padding);
    
    const layoutGridSize = {
        width: layoutGridCellsCount.horizontal * layoutGridCellSize.inner,
        height: layoutGridCellsCount.vertical * layoutGridCellSize.inner
    }

    const layoutSectionContainerSize = calculateLayoutSectionContainerSize(layoutGridCellsCount, layoutGridCellSize);
    
    return {
        sectionsCount: layoutSectionsCount,
        gridCellsCount: layoutGridCellsCount,
        gridCellSize: layoutGridCellSize,
        gridSize: layoutGridSize,
        sectionContainerSize: layoutSectionContainerSize
    };
}

//

export function calculateLayoutGridCellSize(
    containerWidth: number, 
    containerHeight: number, 
    cellCount: LayoutGridCellsCount,
    padding: number
) : LayoutGridCellSize {

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

export function calculateLayoutSectionContainerSize(cellsCount: LayoutGridCellsCount, cellSize: LayoutGridCellSize) : LayoutSectionContainerSize {
    const width = cellsCount.horizontal * cellSize.full;
    const height = cellsCount.vertical * cellSize.full;

    return {
        width,
        height
    }
}*/