import { BoardInteraction } from "@/src/ui/types/board/board.interaction";
import { BoardMetrics } from "@/src/ui/types/board/board.metrics";
import { BoardRegistry } from "@/src/ui/registries/board.registry.types";
import { BoardActions } from "@/src/core/types/domain/board/board.store";
import { BoardSession } from "./board.session";
import { BoardTheme } from "./board.theme";
import { BoardContent } from "./board.content";

export interface BoardContextValue {
    rootRef: React.RefObject<HTMLDivElement | null>;
    registry: BoardRegistry;    
    content: BoardContent;
    actions: BoardActions;
    theme: BoardTheme;
    session: BoardSession;
    interaction: BoardInteraction;
    metrics: BoardMetrics;
}