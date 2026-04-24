import { CanvasContextValue } from "@/src/modules/ui-canvas/types/canvas.context";
import { StoredBoardModel} from "@/src/heute-store/types/board.types";
import { BoardMetrics } from "./board.metrics";
import { TracingDomainSelector } from "../../t-shared/types/tracing.types";

export interface BoardContextValue {    
    rootRef: React.RefObject<HTMLDivElement | null>;
    dataSource: StoredBoardModel | null;
    canvas: CanvasContextValue;
    selector: TracingDomainSelector;
    metrics: BoardMetrics;
}