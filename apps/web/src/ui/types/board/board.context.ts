import { BoardInteraction } from "@/src/ui/types/board/board.interaction";
import { BoardMetrics } from "@/src/ui/types/board/board.metrics";
import { BoardRegistry } from "@/src/ui/registries/board.registry.types";
import { BoardSession } from "./board.session";
import { BoardActions } from "@/src/core/types/domain/board/board.store";

export interface BoardContextValue {
    rootRef: React.RefObject<HTMLDivElement | null>;
    registry: BoardRegistry;    
    actions: BoardActions;
    session: BoardSession;
    interaction: BoardInteraction;
    metrics: BoardMetrics;
}