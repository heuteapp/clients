import { LayoutMetricsValue } from "@/src/core/types/domain/layout/layout.metrics"
import { LayoutSectionData } from "../layout/layout.data";
import { LayoutSectionStyle } from "../layout/layout.style";

export type BoardMetricsValue = {
    layout: LayoutMetricsValue | null
}

export type BoardMetricsContext = {
    layoutSize: { width: number; height: number };
    sections: LayoutSectionData[];
    sectionStyles: LayoutSectionStyle[];
}