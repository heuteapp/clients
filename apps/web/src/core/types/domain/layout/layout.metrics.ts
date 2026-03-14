export type LayoutMetricsValue = {
    spacing: LayoutMetricsSpacing;
    sectionValue: LayoutSectionMetricsValue;
    sectionCount: LayoutSectionMetricsCount;
    sectionContainerValue: LayoutSectionContainerMetricsValue;
}

export type LayoutMetricsSpacing = {
    padding: number;
}

export type LayoutSectionMetricsValue = {
    spacing: LayoutSectionMetricsSpacing;
    gridValue: LayoutGridMetricsValue;
    size: LayoutSectionMetricsSize;
}

export type LayoutSectionMetricsSpacing = {
    padding: number;
}

export type LayoutSectionMetricsSize = {
    width: number;
    height: number;
}

export type LayoutSectionMetricsCount = {
    horizontal: number;
    vertical: number;
}

export type LayoutSectionContainerMetricsValue = {
    spacing: LayoutSectionContainerMetricsSpacing;
    size: LayoutSectionContainerMetricsSize;
}

export type LayoutSectionContainerMetricsSpacing = {
    padding: number;
}

export type LayoutSectionContainerMetricsSize = {
    width: number;
    height: number;
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