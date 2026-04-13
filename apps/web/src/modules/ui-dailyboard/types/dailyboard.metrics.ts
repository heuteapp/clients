import { LayoutMetricsValue } from "../../ui-layout/types/layout.metrics";
import { DailyboardRegistry } from "./dailyboard.registry";

export interface DailyboardMetrics {
    value: DailyboardMetricsValue | null;
}

export interface DailyboardMetricsValue {
    layout: LayoutMetricsValue;
    cardSize: {
        headerHeight: number;
    }
}

export interface CalculateDailyboardMetrics {
    layout: LayoutMetricsValue | null;
}

export interface ApplyDailyboardMetrics {
    registry: DailyboardRegistry;
    metrics: DailyboardMetrics;
}