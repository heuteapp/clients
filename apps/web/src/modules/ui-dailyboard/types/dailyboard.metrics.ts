import { LayoutMetrics } from "../../ui-layout/types/layout.metrics";
import { DailyboardRegistry } from "./dailyboard.registry";

export interface DailyboardMetrics {
    value: DailyboardMetricsValue | null;
}

export interface DailyboardMetricsValue {
    layout: LayoutMetrics;
    cardSize: {
        headerHeight: number;
    }
}

export interface CalculateDailyboardMetrics {
    layout: LayoutMetrics;
}

export interface ApplyDailyboardMetrics {
    registry: DailyboardRegistry;
    metrics: DailyboardMetrics;
}