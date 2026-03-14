import { BoardRegistry } from "@/src/ui/registries/board.registry.types";
import { HeuteLayoutData, LayoutSectionData } from "@/src/core/types/domain/layout/layout.data";
import { LayoutSectionMetricsCount, LayoutSectionMetricsValue, LayoutMetricsValue, LayoutGridMetricsValue, LayoutGridMetricsSpacing, LayoutGridCellMetricsCount, LayoutGridCellMetricsValue, LayoutGridCellMetricsSize, LayoutGridMetricsSize } from "@/src/core/types/domain/layout/layout.metrics";

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
    metricsValue.sectionValue = calculateLayoutSectionMetricsValue(registry, layoutElement);

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

export function calculateLayoutSectionMetricsValue(registry: BoardRegistry, layoutElement: HTMLElement): LayoutSectionMetricsValue {
    const sectionMetricsValue = {} as LayoutSectionMetricsValue;

    sectionMetricsValue.gridValue = calculateLayoutGridMetricsValue(registry, layoutElement);

    return sectionMetricsValue;
}

export function calculateLayoutGridMetricsValue(registry: BoardRegistry, layoutElement: HTMLElement): LayoutGridMetricsValue {
    const gridMetricsValue = {} as LayoutGridMetricsValue;

    gridMetricsValue.spacing = calculateLayoutGridMetricsSpacing(layoutElement);
    gridMetricsValue.cellCount = calculateLayoutGridCellMetricsCount(registry.layout.props as HeuteLayoutData);
    gridMetricsValue.cellValue = calculateLayoutGridCellMetricsValue(layoutElement, gridMetricsValue);
    gridMetricsValue.size = calculateLayoutGridMetricsSize(gridMetricsValue.cellCount, gridMetricsValue.cellValue.size);

    return gridMetricsValue;
}

export function calculateLayoutGridMetricsSpacing(layoutElement: HTMLElement): LayoutGridMetricsSpacing {
    const { clientWidth: layoutWidth, clientHeight: layoutHeight } = layoutElement;
    const padding = Math.min(layoutWidth, layoutHeight) * 0.05;    

    return {
        padding
    }
}

export function calculateLayoutGridCellMetricsCount(layoutData: HeuteLayoutData): LayoutGridCellMetricsCount {
    return {
        horizontal: layoutData.columnCount,
        vertical: layoutData.rowCount
    }
}

export function calculateLayoutGridCellMetricsValue(layoutElement: HTMLElement, gridMetricsValue : LayoutGridMetricsValue) : LayoutGridCellMetricsValue {
    const gridCellMetricsValue = {} as LayoutGridCellMetricsValue;

    gridCellMetricsValue.size = calculateLayoutGridCellMetricsSize(layoutElement, gridMetricsValue);

    return gridCellMetricsValue;
}

export function calculateLayoutGridCellMetricsSize(layoutElement: HTMLElement, gridMetricsValue : LayoutGridMetricsValue) : LayoutGridCellMetricsSize {
    const { clientWidth: layoutWidth, clientHeight: layoutHeight } = layoutElement;

    const colCount = gridMetricsValue.cellCount.horizontal;
    const rowCount = gridMetricsValue.cellCount.vertical;

    const full = Math.min(
        layoutWidth / colCount,
        layoutHeight / rowCount
    );

    const inner = Math.min(
        (layoutWidth - ((colCount + 4) * gridMetricsValue.spacing.padding * 2)) / colCount,
        (layoutHeight - ((rowCount + 4) * gridMetricsValue.spacing.padding * 2)) / rowCount
    );

    const compact = inner * 0.9;

    return {
        full,
        inner,
        compact
    }
}

export function calculateLayoutGridMetricsSize(cellCount: LayoutGridCellMetricsCount, cellSize: LayoutGridCellMetricsSize) : LayoutGridMetricsSize {
    const width = cellCount.horizontal * cellSize.full;
    const height = cellCount.vertical * cellSize.full;

    return {
        width,
        height
    }
}