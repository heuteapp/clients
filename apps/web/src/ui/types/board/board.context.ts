import { BoardInteraction } from "@/src/ui/types/board/board.interaction";
import { BoardMetrics } from "@/src/ui/types/board/board.dom";
import { BoardRegistry } from "@/src/ui/registries/board.registry.types";
import { BoardSessionState } from "@/src/core/types/domain/board/board.session";

export interface BoardContextValue {
    interaction: BoardInteraction;
    registry: BoardRegistry;
    sessionRef: React.RefObject<BoardSessionState>;
    metricsRef: React.RefObject<BoardMetrics | null>;
}