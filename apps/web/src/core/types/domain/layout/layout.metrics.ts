export type LayoutMetricsValue = {
    sectionCount: LayoutMetricsSectionCount;
    totalSpacing: LayoutMetricsTotalSpacing;
    gridCellSize: LayoutMetricsGridCellSize;
    gridFullSize: LayoutMetricsGridFullSize;
    sectionContainerFullSize: LayoutMetricsSectionContainerFullSize;
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

export type LayoutMetricsGridFullSize = {
    width: number;
    height: number;
}

export type LayoutMetricsSectionContainerFullSize = {
    width: number;
    height: number;
}