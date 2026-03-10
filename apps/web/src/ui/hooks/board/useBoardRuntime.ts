import { produce } from "immer";
import { useBoardInteraction } from "./useBoardInteraction"
import { useBoardMetrics } from "./useBoardMetrics"
import { useBoardRegistry } from "./useBoardRegistry"
import { useBoardSessionRef } from "./useBoardSessionRef"
import { useBoardStore } from "@/src/stores/board.store";
import { useBoardPointerEvents } from "./useBoardPointerEvents";
import { BoardContextValue } from "@/src/ui/types/board/board.context";

export function useBoardRuntime({ rootRef }: { rootRef: React.RefObject<HTMLDivElement | null> }) : BoardContextValue {
    const layout = useBoardStore(state => state.layout);
    const sections = useBoardStore(state => state.sections);

    const registry = useBoardRegistry();

    const sessionRef = useBoardSessionRef();

    const interaction = useBoardInteraction(sessionRef, (updater) => {
        sessionRef.current = produce(sessionRef.current, updater)
    });

    const metricsRef = useBoardMetrics({
        registry,
        gridDimensions: {
            columnCount: layout?.columnCount ?? 0,
            rowCount: layout?.rowCount ?? 0
        },
        sections,
        padding: 4
    })


    useBoardPointerEvents(rootRef, registry, metricsRef, sessionRef, interaction);

    return {
        sessionRef,
        metricsRef,
        registry,
        interaction
    }
}