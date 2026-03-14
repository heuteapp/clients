import { BoardRegistry } from "@/src/ui/registries/board.registry.types";
import { HeuteLayoutData, LayoutSectionData } from "@/src/core/types/domain/layout/layout.data";
import { 
    LayoutSectionMetricsCount, LayoutSectionMetricsValue, LayoutMetricsValue, 
    LayoutGridMetricsValue, LayoutGridMetricsSpacing, LayoutGridCellMetricsCount, 
    LayoutGridCellMetricsValue, LayoutGridCellMetricsSize, LayoutGridMetricsSize, 
    LayoutSectionContainerMetricsValue, LayoutSectionContainerMetricsSize, 
    LayoutMetricsSpacing, LayoutSectionMetricsSpacing 
} from "@/src/core/types/domain/layout/layout.metrics";

// -------------------- Main --------------------
export function calculateLayoutMetrics(registry: BoardRegistry) : LayoutMetricsValue | undefined {
    const layout = registry.layout;
    const layoutProps = layout.props;
    if (!layoutProps) return;

    const layoutElement = layout.ref?.current;
    if (!layoutElement) return;

    const sections = registry.getLayoutSections();
    if (!sections) return;

    const sectionDatas = sections.map(section => section.props) as LayoutSectionData[];
    if (sectionDatas.some(props => !props)) return;

    const metricsValue = {} as LayoutMetricsValue;

    // spacing objelerini referans üzerinden hesapla
    if (!metricsValue.spacing) metricsValue.spacing = {} as LayoutMetricsSpacing;
    calculateLayoutSpacing(metricsValue.spacing, layoutElement);

    if (!metricsValue.sectionCount) metricsValue.sectionCount = {} as LayoutSectionMetricsCount;
    calculateLayoutSectionMetricsCount(sectionDatas, metricsValue.sectionCount);

    if (!metricsValue.sectionValue) metricsValue.sectionValue = {} as LayoutSectionMetricsValue;
    calculateLayoutSectionMetricsValue(registry, metricsValue, layoutElement);

    if (!metricsValue.sectionContainerValue) metricsValue.sectionContainerValue = {} as LayoutSectionContainerMetricsValue;
    calculateLayoutSectionContainerMetricsValue(metricsValue, metricsValue.sectionContainerValue);

    return metricsValue;
}

// -------------------- Layout Spacing --------------------
export function calculateLayoutSectionMetricsValue(registry: BoardRegistry, metricsValue: LayoutMetricsValue, layoutElement: HTMLElement) {
    if (!metricsValue.sectionValue.spacing) metricsValue.sectionValue.spacing = {} as LayoutSectionMetricsSpacing;
    calculateLayoutSectionMetricsSpacing(metricsValue.sectionValue.spacing, layoutElement);

    if (!metricsValue.sectionValue.gridValue) metricsValue.sectionValue.gridValue = {} as LayoutGridMetricsValue;
    calculateLayoutGridMetricsValue(registry, layoutElement, metricsValue.sectionValue.gridValue, metricsValue.sectionValue.spacing);
}

export function calculateLayoutSpacing(spacing: LayoutMetricsSpacing, layoutElement: HTMLElement) {
    spacing.padding = 0;
}

export function calculateLayoutSectionMetricsSpacing(spacing: LayoutSectionMetricsSpacing, layoutElement: HTMLElement) {
    spacing.padding = 12;
}

export function calculateLayoutGridMetricsSpacing(spacing: LayoutGridMetricsSpacing, layoutElement: HTMLElement) {
    spacing.padding = 0;
}

// -------------------- Section Count --------------------
export function calculateLayoutSectionMetricsCount(sections: LayoutSectionData[], sectionCount: LayoutSectionMetricsCount) {
    sectionCount.horizontal = 0;
    sectionCount.vertical = 0;

    if (sections.length === 0) return;

    const maxRow = Math.max(...sections.map(s => s.position.rowIndex + s.position.rowSpan));
    const maxCol = Math.max(...sections.map(s => s.position.colIndex + s.position.colSpan));

    for (let row = 1; row <= maxRow; row++) {
        let count = 0;
        for (const s of sections) if (row >= s.position.rowIndex && row < s.position.rowIndex + s.position.rowSpan) count++;
        sectionCount.horizontal = Math.max(sectionCount.horizontal, count);
    }

    for (let col = 1; col <= maxCol; col++) {
        let count = 0;
        for (const s of sections) if (col >= s.position.colIndex && col < s.position.colIndex + s.position.colSpan) count++;
        sectionCount.vertical = Math.max(sectionCount.vertical, count);
    }
}

// -------------------- Section Container --------------------
export function calculateLayoutSectionContainerMetricsValue(metricsValue: LayoutMetricsValue, containerValue: LayoutSectionContainerMetricsValue) {
    containerValue.size = {} as LayoutSectionContainerMetricsSize;
    containerValue.size.width = metricsValue.sectionValue.gridValue.cellCount.horizontal * metricsValue.sectionValue.gridValue.cellValue.size.full;
    containerValue.size.height = metricsValue.sectionValue.gridValue.cellCount.vertical * metricsValue.sectionValue.gridValue.cellValue.size.full;
}

// -------------------- Grid --------------------
export function calculateLayoutGridMetricsValue(
    registry: BoardRegistry, 
    layoutElement: HTMLElement, 
    gridValue: LayoutGridMetricsValue, 
    sectionSpacing: LayoutSectionMetricsSpacing
) {
    if (!gridValue.spacing) gridValue.spacing = {} as LayoutGridMetricsSpacing;
    calculateLayoutGridMetricsSpacing(gridValue.spacing, layoutElement);


    if(!gridValue.cellCount) gridValue.cellCount = {} as LayoutGridCellMetricsCount;
    calculateLayoutGridCellMetricsCount(gridValue.cellCount, registry.layout.props as HeuteLayoutData);

    if (!gridValue.cellValue) gridValue.cellValue = {} as LayoutGridCellMetricsValue;
    calculateLayoutGridCellMetricsValue(layoutElement, gridValue.cellValue, gridValue, sectionSpacing);

    if (!gridValue.size) gridValue.size = {} as LayoutGridMetricsSize;
    calculateLayoutGridMetricsSize(gridValue.size, gridValue.cellCount, gridValue.cellValue.size);
}

export function calculateLayoutGridCellMetricsCount(count: LayoutGridCellMetricsCount , layoutData: HeuteLayoutData) {
    count.horizontal = layoutData.columnCount ?? 0;
    count.vertical = layoutData.rowCount ?? 0
}

export function calculateLayoutGridCellMetricsValue(
    layoutElement: HTMLElement, 
    cellValue: LayoutGridCellMetricsValue,
    gridValue: LayoutGridMetricsValue,
    sectionSpacing: LayoutSectionMetricsSpacing
) {
    if (!cellValue.size) cellValue.size = {} as LayoutGridCellMetricsSize;
    calculateLayoutGridCellMetricsSize(layoutElement, cellValue.size, gridValue, sectionSpacing);
}

export function calculateLayoutGridCellMetricsSize(
    layoutElement: HTMLElement, 
    size: LayoutGridCellMetricsSize,
    gridValue: LayoutGridMetricsValue,
    sectionSpacing: LayoutSectionMetricsSpacing
) {
    const { clientWidth: layoutWidth, clientHeight: layoutHeight } = layoutElement;

    const colCount = gridValue.cellCount.horizontal;
    const rowCount = gridValue.cellCount.vertical;
    const gapX = sectionSpacing.padding;
    const gapY = sectionSpacing.padding;

    size.full = Math.min(layoutWidth / colCount, layoutHeight / rowCount);

    const usableWidth = layoutWidth - (colCount - 1) * gapX;
    const usableHeight = layoutHeight - (rowCount - 1) * gapY;

    size.inner = Math.min(usableWidth / colCount, usableHeight / rowCount);
    size.compact = size.inner * 0.9;
}

export function calculateLayoutGridMetricsSize(size: LayoutGridMetricsSize, cellCount: LayoutGridCellMetricsCount, cellSize: LayoutGridCellMetricsSize) {
    size.width = cellCount.horizontal * cellSize.full;
    size.height = cellCount.vertical * cellSize.full;
}