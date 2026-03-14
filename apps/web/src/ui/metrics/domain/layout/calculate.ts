import { BoardRegistry } from "@/src/ui/registries/board.registry.types";
import { HeuteLayoutData, LayoutSectionData } from "@/src/core/types/domain/layout/layout.data";
import { LayoutSectionMetricsCount, LayoutSectionMetricsValue, LayoutMetricsValue, LayoutGridMetricsValue, LayoutGridMetricsSpacing, LayoutGridCellMetricsCount, LayoutGridCellMetricsValue, LayoutGridCellMetricsSize, LayoutGridMetricsSize, LayoutSectionContainerMetricsValue, LayoutSectionContainerMetricsSize, LayoutMetricsSpacing, LayoutSectionMetricsSpacing } from "@/src/core/types/domain/layout/layout.metrics";

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

    metricsValue.spacing = calculateLayoutSpacing(layoutElement);
    metricsValue.sectionCount = calculateLayoutSectionMetricsCount(sectionDatas);
    metricsValue.sectionValue = calculateLayoutSectionMetricsValue(registry, layoutElement);
    metricsValue.sectionContainerValue = calculateLayoutSectionContainerMetricsValue(metricsValue);
    
    return metricsValue;
}

export function calculateLayoutSpacing(layoutElement: HTMLElement): LayoutMetricsSpacing {
    const { clientWidth: layoutWidth, clientHeight: layoutHeight } = layoutElement;
    const padding = 0;

    return {
        padding
    }
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

    sectionMetricsValue.spacing = calculateLayoutSectionMetricsSpacing(layoutElement);
    sectionMetricsValue.gridValue = calculateLayoutGridMetricsValue(registry, layoutElement);

    return sectionMetricsValue;
}

export function calculateLayoutSectionMetricsSpacing(layoutElement: HTMLElement): LayoutSectionMetricsSpacing {
    const { clientWidth: layoutWidth, clientHeight: layoutHeight } = layoutElement;
    const padding = 0;

    return {
        padding
    }
}

export function calculateLayoutSectionContainerMetricsValue(metricsValue: LayoutMetricsValue) : LayoutSectionContainerMetricsValue {
    const sectionContainerMetricsValue = {} as LayoutSectionContainerMetricsValue;

    sectionContainerMetricsValue.size = calculateLayoutSectionContainerMetricsSize(metricsValue);

    return sectionContainerMetricsValue;
}

export function calculateLayoutSectionContainerMetricsSize(metricsValue: LayoutMetricsValue) : LayoutSectionContainerMetricsSize {
    const width = metricsValue.sectionValue.gridValue.cellCount.horizontal * metricsValue.sectionValue.gridValue.cellValue.size.full;
    const height = metricsValue.sectionValue.gridValue.cellCount.vertical * metricsValue.sectionValue.gridValue.cellValue.size.full;

    return {
        width,
        height
    }
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
    const padding = 12;    

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

    const totalPaddingX = (colCount - 1) * gridMetricsValue.spacing.padding;
    const totalPaddingY = (rowCount - 1) * gridMetricsValue.spacing.padding;

    const innerWidth = (layoutWidth - totalPaddingX) / colCount;
    const innerHeight = (layoutHeight - totalPaddingY) / rowCount;
    const inner = Math.min(innerWidth, innerHeight);

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