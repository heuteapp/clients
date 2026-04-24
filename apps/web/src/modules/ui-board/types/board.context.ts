import { CanvasContextValue } from "@/src/modules/ui-canvas/types/canvas.context";
import { BoardRegistry } from "./board.registry";
import { StoredBoardModel} from "@/src/heute-store/types/board.types";
import { BoardMetrics } from "./board.metrics";

export interface BoardContextValue {    
    dataSource: StoredBoardModel | null;
    canvas: CanvasContextValue;
    registry: BoardRegistry;    
    metrics: BoardMetrics;
}