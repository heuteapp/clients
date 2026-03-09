"use client";

import { useMemo } from "react";
import { BoardContext } from "../../contexts/board.context";
import { useBoardInteraction, useBoardPointerEvents, useBoardRegistry, useBoardSessionRef } from "../../hooks/board.hooks";
import { useLayoutMeasurements } from "@/src/ui/hooks/layout.hooks";
import { useBoardStore } from "@/src/stores/board.store";

export default function BoardProvider({ children, rootRef }: BoardProviderProps) {
    const registry = useBoardRegistry();

    const sessionRef = useBoardSessionRef();
    const interaction = useBoardInteraction((updater) => {
        sessionRef.current = updater(sessionRef.current);
    });

    const board = useBoardStore(state => state.board)!;
    const layout = useBoardStore(state => state.layout);
    const sections = useBoardStore(state => state.sections);

    const measurements = useLayoutMeasurements({
        layoutRef: registry.layout.ref,
        gridDimensions: {
            columnCount: layout?.columnCount ?? 0,
            rowCount: layout?.rowCount ?? 0
        },
        sections,
        padding: 4
    })

    useBoardPointerEvents(rootRef, registry, measurements, sessionRef, interaction);
    const session = sessionRef.current;

    const value = useMemo(
        () => ({
            rootRef,
            session,
            interaction,
            registry,
            measurements
        }),
        [session, interaction, registry, measurements]
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