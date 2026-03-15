import { BoardInteraction } from "@/src/ui/types/board/board.interaction";
import { BoardMetricsManager } from "@/src/ui/types/board/board.metrics";
import { BoardRegistry } from "@/src/ui/registries/board.registry.types";
import { BoardSessionManager } from "./board.session";
import { BoardThemeManager } from "./board.theme";
import { BoardContentManager } from "./board.content";

export interface BoardContextValue {
    rootRef: React.RefObject<HTMLDivElement | null>;
    registry: BoardRegistry;    
    content: BoardContentManager;
    theme: BoardThemeManager;
    session: BoardSessionManager;
    interaction: BoardInteraction;
    metrics: BoardMetricsManager;
}