export type LayoutMetricsValue = {
    sectionCount: LayoutMetricsSectionCount;
    totalSpacing: LayoutMetricsTotalSpacing;
    totalSpacingAxisRecord: LayoutMetricsTotalSpacingAxisRecord;
    gridCellSize: LayoutMetricsGridCellSize;
    gridFullSize: LayoutMetricsGridFullSize;
    sectionContainerSize: LayoutMetricsSectionContainerSize;
}

export type LayoutMetricsSectionCount = {
    horizontal: number;
    vertical: number;
}

export type LayoutMetricsTotalSpacing = {
    horizontal: LayoutMetricsTotalSpacingAxis;
    vertical: LayoutMetricsTotalSpacingAxis;
}

export type LayoutMetricsTotalSpacingAxisRecord = {
    horizontal: LayoutMetricsTotalSpacingAxis[];
    vertical: LayoutMetricsTotalSpacingAxis[];
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

export type LayoutMetricsSectionContainerSize = {
    width: number;
    height: number;
}