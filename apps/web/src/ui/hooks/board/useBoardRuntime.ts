import { useBoardInteraction } from "./useBoardInteraction"
import { useBoardMetrics } from "./useBoardMetrics"
import { useBoardRegistry } from "./useBoardRegistry"
import { useBoardPointerEvents } from "./useBoardPointerEvents";
import { BoardContextValue } from "@/src/ui/types/board/board.context";
import { useBoardSession } from "./useBoardSessionRef";

export function useBoardRuntime(rootRef: React.RefObject<HTMLDivElement | null>) : BoardContextValue {
    const registry = useBoardRegistry();
    const session = useBoardSession();
    const interaction = useBoardInteraction(session);
    const metrics = useBoardMetrics(rootRef, registry);

    useBoardPointerEvents(rootRef, registry, session, interaction, metrics);

    return {
        registry,
        session,
        interaction,
        metrics,
    }
}