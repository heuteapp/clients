import { useBoardInteraction } from "./useBoardInteraction"
import { useBoardMetrics } from "./useBoardMetrics"
import { useBoardRegistry } from "./useBoardRegistry"
import { BoardContextValue } from "@/src/ui/types/board/board.context";
import { useBoardSessionManager } from "./useBoardSessionManager";
import { useBoardContentManager } from "./useBoardContentManager";
import { useBoardThemeManager } from "./useBoardThemeManager";

export function useBoardRuntime(rootRef: React.RefObject<HTMLDivElement | null>) : BoardContextValue {
    const registry = useBoardRegistry();
    const content = useBoardContentManager();
    const theme = useBoardThemeManager();
    const session = useBoardSessionManager();
    const interaction = useBoardInteraction(session);
    const metrics = useBoardMetrics(rootRef, registry);

    return {
        rootRef,
        registry,
        content,
        theme,
        session,
        interaction,
        metrics,
    }
}