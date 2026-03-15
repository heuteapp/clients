export type LayoutMetricsValue = {
    sectionCount: LayoutMetricsCellCount;
    gridCellSize: LayoutMetricsGridCellSize;
}

export type LayoutMetricsCellCount = {
    horizontal: number;
    vertical: number;
}

export type LayoutMetricsGridCellSize = {
    total: number;
    inner: number;
    compact: number;
}