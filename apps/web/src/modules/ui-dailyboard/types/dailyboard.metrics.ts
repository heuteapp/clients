import { LayoutMetrics } from "../../ui-layout/types/layout.metrics";
import { DailyboardRegistry } from "./dailyboard.registry";

export interface DailyboardMetrics {
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