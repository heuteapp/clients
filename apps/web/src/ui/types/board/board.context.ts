import { BoardInteraction } from "@/src/ui/types/board/board.interaction";
import { BoardMetrics } from "@/src/ui/types/board/board.dom";
import { BoardRegistry } from "@/src/ui/registries/board.registry.types";
import { BoardSession } from "./board.session";

export interface BoardContextValue {
    interaction: BoardInteraction;
    registry: BoardRegistry;
    session: BoardSession;
    metricsRef: React.RefObject<BoardMetrics | null>;
}