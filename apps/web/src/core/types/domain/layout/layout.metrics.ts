export type LayoutMetricsValue = {
    sectionValue: LayoutSectionMetricsValue;
    sectionCount: LayoutSectionMetricsCount;
}

export type LayoutSectionMetricsValue = {
    gridValue: LayoutGridMetricsValue;
    size: LayoutSectionMetricsSize;
}

export type LayoutSectionMetricsSize = {
    width: number;
    height: number;
}

export type LayoutSectionMetricsCount = {
    horizontal: number;
    vertical: number;
}

export type LayoutGridMetricsValue = {
    spacing: LayoutGridMetricsSpacing;
    size: LayoutGridMetricsSize;
    cellValue: LayoutGridCellMetricsValue;
    cellCount: LayoutGridCellMetricsCount;
}

export type LayoutGridMetricsSpacing = {
    padding: number;
}

export type LayoutGridMetricsSize = {
    width: number;
    height: number;
}

export type LayoutGridCellMetricsValue = {
    size: LayoutGridCellMetricsSize;
}

export type LayoutGridCellMetricsCount = {
    horizontal: number;
    vertical: number;
}

export type LayoutGridCellMetricsSize = {
    full: number;
    inner: number;
    compact: number;
}