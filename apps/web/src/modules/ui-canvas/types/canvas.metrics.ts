import { StoredCanvasModel, StoredCanvasStyle } from "@/src/heute-store/types/canvas.types"
import { TracingDomainSelector } from "../../t-core/types/tracing.types";

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
    selector: TracingDomainSelector,
    dataSource: StoredCanvasModel | null, 
    styleSource: StoredCanvasStyle | null
}

export interface ApplyCanvasMetricsProps {
    selector: TracingDomainSelector,
    metrics: CanvasMetrics
    styleSource: StoredCanvasStyle | null
}