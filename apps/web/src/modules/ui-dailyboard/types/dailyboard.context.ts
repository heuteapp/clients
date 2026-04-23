import { CanvasContextValue } from "@/src/modules/ui-canvas/types/canvas.context";
import { DailyboardRegistry } from "./dailyboard.registry";
import { StoredDailyboardModel} from "@/src/heute-store/types/dailyboard.types";
import { DailyboardMetrics } from "./dailyboard.metrics";

export interface DailyboardContextValue {    
    dataSource: StoredDailyboardModel | null;
    canvas: CanvasContextValue;
    registry: DailyboardRegistry;    
    metrics: DailyboardMetrics;
}