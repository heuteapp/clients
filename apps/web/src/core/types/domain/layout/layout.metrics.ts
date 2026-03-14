export type LayoutMetricsValue = {
    sectionValue: LayoutMetricsSectionValue;
    sectionCount: LayoutMetricsSectionCount;
}

export type LayoutMetricsSectionValue = {
    grid: LayoutMetricsGrid;
    size: LayoutMetricsSectionSize;
}

export type LayoutMetricsSectionSize = {
    width: number;
    height: number;
}

export type LayoutMetricsSectionCount = {
    horizontal: number;
    vertical: number;
}

export type LayoutMetricsGrid = {
    spacing: LayoutMetricsGridSpacing;
    size: LayoutMetricsGridSize;
    cellValue: LayoutMetricsGridCellValue;
    cellCount: LayoutMetricsGridCellCount;
}

export type LayoutMetricsGridSpacing = {
    padding: number;
}

export type LayoutMetricsGridSize = {
    width: number;
    height: number;
}

export type LayoutMetricsGridCellValue = {
    size: LayoutMetricsGridCellSize;
}

export type LayoutMetricsGridCellCount = {
    horizontal: number;
    vertical: number;
}

export type LayoutMetricsGridCellSize = {
    full: number;
    inner: number;
    compact: number;
}