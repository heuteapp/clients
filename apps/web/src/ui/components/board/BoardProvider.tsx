"use client";

import { useMemo } from "react";
import { BoardContext } from "../../contexts/board.context";
import { useBoardInteraction, useBoardPointerEvents, useBoardRegistry, useBoardSessionRef } from "@/src/ui/hooks/board";
import { useBoardMetrics } from "@/src/ui/hooks/board";
import { useBoardStore } from "@/src/stores/board";
import { produce } from "immer";

export default function BoardProvider({ children, rootRef }: BoardProviderProps) {
    const registry = useBoardRegistry();

    const sessionRef = useBoardSessionRef();
    const interaction = useBoardInteraction((updater) => {
        sessionRef.current = produce(sessionRef.current, updater)
    });

    const layout = useBoardStore(state => state.layout);
    const sections = useBoardStore(state => state.sections);

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

    const value = useMemo(
        () => ({
            rootRef,
            sessionRef,
            metricsRef,
            interaction,
            registry,
        }),
        [sessionRef, interaction, registry, metricsRef]
    );

    return (
        <BoardContext.Provider value={value}>
            {children}
        </BoardContext.Provider>
    );
}

export interface BoardProviderProps {
    rootRef: React.RefObject<HTMLDivElement | null>;
    children: React.ReactNode;
}