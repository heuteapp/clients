import { LayoutSectionData } from "./layout.data";
import { LayoutSectionStyle } from "./layout.style";

export type LayoutMetricsValue = {
    sectionCount: LayoutMetricsSectionCount;
    totalSpacing: LayoutMetricsTotalSpacing;
    gridCellSize: LayoutMetricsGridCellSize;
}

export type LayoutMetricsContext = {
    layoutSize: { width: number; height: number };
    sections: LayoutSectionData[];
    sectionStyles: LayoutSectionStyle[];
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