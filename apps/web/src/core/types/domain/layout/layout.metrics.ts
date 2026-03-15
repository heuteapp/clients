export type LayoutMetricsValue = {
    sectionCount: LayoutMetricsCellCount;
    totalSpacing: LayoutMetricsTotalSpacing;
    gridCellSize: LayoutMetricsGridCellSize;
}

export type LayoutMetricsCellCount = {
    horizontal: number;
    vertical: number;
}

export type LayoutMetricsTotalSpacing = {
    horizontal: LayoutMetricsTotalSpacingAxis;
    vertical: LayoutMetricsTotalSpacingAxis;
}

export type LayoutMetricsTotalSpacingAxis = {
    padding: number;
    margin: number;
}

export type LayoutMetricsGridCellSize = {
    total: number;
    inner: number;
    compact: number;
}