"use client";

import { useMemo, useRef, useState } from "react";
import { BoardContext } from "../board.context";
import { useBoardInteraction, useBoardPointerEvents, useBoardSessionRef } from "../board.hooks";
import { useLayoutMeasurements, useLayoutRegistry } from "@/src/domain/layout/layout.hooks";
import { BoardData } from "../board.types";
import { sectionExamples } from "../board.examples";
import { analyzeLayout } from "../../layout/layout.utils";

export default function BoardProvider({ children, rootRef }: BoardProviderProps) {

    const layoutRef = useRef<HTMLDivElement>(null);
    const layoutRegistry = useLayoutRegistry();

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

    const analyze = analyzeLayout(board.layout.sections);

    const measurements = useLayoutMeasurements({
        layoutRef,
        columnCount: board.layout.columnCount,
        rowCount: board.layout.rowCount,
        analyze,
        padding: 12
    })

    layoutRegistry.measurements = measurements;

    useBoardPointerEvents(board, setBoard, rootRef, layoutRegistry, sessionRef, interaction);
    const session = sessionRef.current;

    const value = useMemo(
        () => ({
            board,
            setBoard,
            rootRef,
            session,
            interaction,
            layoutRegistry,
            layoutRef
        }),
        [session, interaction, layoutRegistry]
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