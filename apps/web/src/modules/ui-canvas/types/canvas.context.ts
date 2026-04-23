import { StoredCanvasData, StoredCanvasStyle } from "@/src/heute-store/types/canvas.types";
import { CanvasRegistry } from "./canvas.registry";
import { CanvasMetrics } from "./canvas.metrics";

export interface CanvasContextValue {
    dataSource: StoredCanvasData | null;
    styleSource: StoredCanvasStyle | null;
    registry: CanvasRegistry;    
    metrics: CanvasMetrics;
}