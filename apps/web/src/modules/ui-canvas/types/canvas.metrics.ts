import { StoredCanvasModel, StoredCanvasStyle } from "@/src/heute-store/types/canvas.types"
import { CanvasRegistry } from "./canvas.registry"

export interface CanvasMetrics {
    value: CanvasMetricsValue | null;
}

export interface CanvasMetricsValue {
    viewSize: {
        width: number;
        height: number;
    },
    viewRatio: {
        width: number;
        height: number;
    },
    cellSize: {
        canvas: number,
        grid: number,
    }
}

export interface CalculateCanvasMetricsProps {
    registry: CanvasRegistry, 
    dataSource: StoredCanvasModel | null, 
    styleSource: StoredCanvasStyle | null
}

export interface ApplyCanvasMetricsProps {
    registry: CanvasRegistry,
    metrics: CanvasMetrics
    styleSource: StoredCanvasStyle | null
}