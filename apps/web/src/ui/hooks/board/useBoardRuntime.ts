import { useBoardInteraction } from "./useBoardInteraction"
import { useBoardMetrics } from "./useBoardMetrics"
import { useBoardRegistry } from "./useBoardRegistry"
import { BoardContextValue } from "@/src/ui/types/board/board.context";
import { useBoardSessionManager } from "./useBoardSessionManager";
import { useBoardContentManager } from "./useBoardContentManager";
import { useBoardThemeManager } from "./useBoardThemeManager";

export function useBoardRuntime(rootRef: React.RefObject<HTMLDivElement | null>) : BoardContextValue {
    const registry = useBoardRegistry();
    const contentManager = useBoardContentManager();
    const themeManager = useBoardThemeManager();
    const sessionManager = useBoardSessionManager();
    const interaction = useBoardInteraction(sessionManager);
    const metrics = useBoardMetrics(rootRef, registry);

    return {
        rootRef,
        registry,
        contentManager,
        themeManager,
        sessionManager,
        interaction,
        metrics,
    }
}