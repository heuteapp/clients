import { BoardInteraction } from "@/src/ui/types/board/board.interaction";
import { BoardMetrics } from "@/src/ui/types/board/board.metrics";
import { BoardRegistry } from "@/src/ui/registries/board.registry.types";
import { BoardSession } from "./board.session";
import { BoardTheme } from "./board.theme";
import { BoardContentManager } from "./board.content";

export interface BoardContextValue {
    rootRef: React.RefObject<HTMLDivElement | null>;
    registry: BoardRegistry;    
    content: BoardContentManager;
    theme: BoardTheme;
    session: BoardSession;
    interaction: BoardInteraction;
    metrics: BoardMetrics;
}