import { produce } from "immer";
import { useBoardInteraction } from "./useBoardInteraction"
import { useBoardMetrics } from "./useBoardMetrics"
import { useBoardRegistry } from "./useBoardRegistry"
import { useBoardSessionRef } from "./useBoardSessionRef"
import { useBoardPointerEvents } from "./useBoardPointerEvents";
import { BoardContextValue } from "@/src/ui/types/board/board.context";

export function useBoardRuntime(rootRef: React.RefObject<HTMLDivElement | null>) : BoardContextValue {
    const registry = useBoardRegistry();

    const sessionRef = useBoardSessionRef();

    const updateSession = (updater: (draft: any) => void) => {
        sessionRef.current = produce(sessionRef.current, updater)
    }

    const interaction = useBoardInteraction(sessionRef, updateSession);
    const metricsRef = useBoardMetrics(rootRef, registry);

    useBoardPointerEvents(rootRef, registry, metricsRef, sessionRef, interaction);

    return {
        sessionRef,
        metricsRef,
        registry,
        interaction
    }
}