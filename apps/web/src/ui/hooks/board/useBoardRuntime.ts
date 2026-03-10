import { useBoardInteraction } from "./useBoardInteraction"
import { useBoardMetrics } from "./useBoardMetrics"
import { useBoardRegistry } from "./useBoardRegistry"
import { BoardContextValue } from "@/src/ui/types/board/board.context";
import { useBoardSession } from "./useBoardSession";
import { useBoardActions } from "./useBoardActions";

export function useBoardRuntime(rootRef: React.RefObject<HTMLDivElement | null>) : BoardContextValue {
    const registry = useBoardRegistry();
    const actions = useBoardActions();
    const session = useBoardSession();
    const interaction = useBoardInteraction(session);
    const metrics = useBoardMetrics(rootRef, registry);

    return {
        rootRef,
        registry,
        actions,
        session,
        interaction,
        metrics,
    }
}