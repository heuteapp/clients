import { StoredCanvasModel, StoredCanvasStyle } from "@/src/heute-store/types/canvas.types";
import { CanvasRegistry } from "./canvas.registry";
import { CanvasMetrics } from "./canvas.metrics";

export interface CanvasContextValue {
    dataSource: StoredCanvasModel | null;
    styleSource: StoredCanvasStyle | null;
    registry: CanvasRegistry;    
    metrics: CanvasMetrics;
}