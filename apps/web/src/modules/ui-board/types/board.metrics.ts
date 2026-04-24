import { CanvasMetricsValue } from "../../ui-canvas/types/canvas.metrics";
import { BoardRegistry } from "./board.registry";

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
    registry: BoardRegistry;
    metrics: BoardMetrics;
}