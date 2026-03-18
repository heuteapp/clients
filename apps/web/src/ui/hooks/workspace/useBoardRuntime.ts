import { useBoardInteraction } from "./board/useBoardInteraction"
import { useBoardRegistry } from "./board/useBoardRegistry"
import { BoardContextValue } from "@/src/ui/types/domain/board/board.context";
import { useBoardSessionManager } from "./board/useBoardSessionManager";
import { useBoardContentBridge } from "./board/useBoardContentBridge";
import { useBoardThemeManager } from "./board/useBoardThemeManager";
import { useBoardMetricsManager } from "./board/useBoardMetricsManager";

export function useBoardRuntime(rootRef: React.RefObject<HTMLDivElement | null>) : BoardContextValue {
    const registry = useBoardRegistry();
    const contentManager = useBoardContentBridge();
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