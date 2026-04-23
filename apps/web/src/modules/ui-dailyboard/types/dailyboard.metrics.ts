import { CanvasMetricsValue } from "../../ui-canvas/types/canvas.metrics";
import { DailyboardRegistry } from "./dailyboard.registry";

export interface DailyboardMetrics {
    value: DailyboardMetricsValue | null;
}

export interface DailyboardMetricsValue {
    canvas: CanvasMetricsValue;
    cardSize: {
        headerHeight: number;
    }
}

export interface CalculateDailyboardMetrics {
    canvas: CanvasMetricsValue | null;
}

export interface ApplyDailyboardMetrics {
    registry: DailyboardRegistry;
    metrics: DailyboardMetrics;
}