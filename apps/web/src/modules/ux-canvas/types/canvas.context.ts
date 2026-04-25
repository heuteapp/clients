import { StoredCanvasModel, StoredCanvasStyle } from "@/src/heute-store/types/canvas.types";
import { CanvasMetrics } from "./canvas.metrics";

export interface CanvasContextValue {
    rootRef: React.RefObject<HTMLDivElement | null>;
    dataSource: StoredCanvasModel | null;
    styleSource: StoredCanvasStyle | null;
    metrics: CanvasMetrics;
}