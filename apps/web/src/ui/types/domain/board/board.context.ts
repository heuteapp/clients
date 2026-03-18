import { BoardUserInteraction } from "@/src/ui/types/domain/board/board.interaction";
import { BoardMetricsManager } from "@/src/ui/types/domain/board/board.metrics";
import { BoardRegistry } from "@/src/ui/types/domain/board/board.registry";
import { BoardSessionManager } from "./board.session";
import { BoardThemeManager } from "./board.theme";
import { BoardContentManager } from "./board.content";

export interface BoardContextValue {
    rootRef: React.RefObject<HTMLDivElement | null>;
    registry: BoardRegistry;    
    contentManager: BoardContentManager;
    themeManager: BoardThemeManager;
    metricsManager: BoardMetricsManager;
    sessionManager: BoardSessionManager;
    interaction: BoardUserInteraction;
}