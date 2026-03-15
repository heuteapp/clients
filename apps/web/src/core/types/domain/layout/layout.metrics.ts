export type LayoutMetricsValue = {
    sectionCount: LayoutMetricsSectionCount;
    totalSpacing: LayoutMetricsTotalSpacing;
    gridCellSize: LayoutMetricsGridCellSize;
}

export type LayoutMetricsSectionCount = {
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