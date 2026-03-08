"use client";

import { useMemo, useRef, useState } from "react";
import { BoardContext } from "../board.context";
import { useBoardInteraction, useBoardPointerEvents, useBoardRegistry, useBoardSessionRef } from "../board.hooks";
import { useLayoutMeasurements } from "@/src/domain/layout/layout.hooks";
import { BoardData } from "../board.types";
import { sectionExamples } from "../board.examples";

export default function BoardProvider({ children, rootRef }: BoardProviderProps) {
    const registry = useBoardRegistry();

    const sessionRef = useBoardSessionRef();
    const interaction = useBoardInteraction((updater) => {
        sessionRef.current = updater(sessionRef.current);
    });

    const [board, setBoard] = useState<BoardData>({
        id: "test",
        category: "test",
        date: new Date(),
        layout: {
            columnCount: 18,
            rowCount: 8,
            sections: (sectionExamples as any).two
        },
        cards: []
    });

    const measurements = useLayoutMeasurements({
        layoutRef: registry.layout.ref,
        columnCount: board.layout.columnCount,
        rowCount: board.layout.rowCount,
        sections: board.layout.sections,
        padding: 12
    })

    useBoardPointerEvents(board, setBoard, rootRef, registry, measurements, sessionRef, interaction);
    const session = sessionRef.current;

    const value = useMemo(
        () => ({
            board,
            setBoard,
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