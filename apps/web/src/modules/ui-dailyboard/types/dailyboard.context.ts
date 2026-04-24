import { CanvasContextValue } from "@/src/modules/ui-canvas/types/canvas.context";
import { DailyboardRegistry } from "./dailyboard.registry";
import { StoredBoardModel} from "@/src/heute-store/types/board.types";
import { DailyboardMetrics } from "./dailyboard.metrics";

export interface DailyboardContextValue {    
    dataSource: StoredBoardModel | null;
    canvas: CanvasContextValue;
    registry: DailyboardRegistry;    
    metrics: DailyboardMetrics;
}