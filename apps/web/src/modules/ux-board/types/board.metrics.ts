import { TracingDomainSelector } from "../../t-core/types/tracing.types";
import { CanvasMetricsValue } from "../../ux-canvas/types/canvas.metrics";

export interface BoardMetrics {
    value: BoardMetricsValue | null;
}

export interface BoardMetricsValue {
    canvas: CanvasMetricsValue;
    cardSize: {
        headerHeight: number;
    }
}

export interface CalculateBoardMetrics {
    canvas: CanvasMetricsValue | null;
}

export interface ApplyBoardMetrics {
    selector: TracingDomainSelector;
    metrics: BoardMetrics;
}