import { useBoardInteraction } from "./useBoardInteraction"
import { useBoardRegistry } from "./useBoardRegistry"
import { BoardContextValue } from "@/src/ui/types/domain/board/board.context";
import { useBoardSessionManager } from "./useBoardSessionManager";
import { useBoardContentManager } from "./useBoardContentManager";
import { useBoardThemeManager } from "./useBoardThemeManager";
import { useBoardMetricsManager } from "./useBoardMetricsManager";

export function useBoardRuntime(rootRef: React.RefObject<HTMLDivElement | null>) : BoardContextValue {
    const registry = useBoardRegistry();
    const contentManager = useBoardContentManager();
    const themeManager = useBoardThemeManager();
    const metricsManager = useBoardMetricsManager();
    const sessionManager = useBoardSessionManager();
    const interaction = useBoardInteraction(sessionManager);

    return {
        rootRef,
        registry,
        contentManager,
        themeManager,
        sessionManager,
        interaction,
        metricsManager,
    }
}