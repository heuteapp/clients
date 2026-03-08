"use client";

import { useMemo } from "react";
import { BoardContext } from "../board.context";
import { useBoardInteraction, useBoardPointerEvents, useBoardSessionRef } from "../board.hooks";
import { useLayoutRegistry } from "@/src/domain/layout/layout.hooks";

export default function BoardProvider({ children, rootRef }: BoardProviderProps) {


    const layoutRegistry = useLayoutRegistry();

    const sessionRef = useBoardSessionRef();
    const interaction = useBoardInteraction((updater) => {
        sessionRef.current = updater(sessionRef.current);
    });


    useBoardPointerEvents(rootRef, layoutRegistry, sessionRef, interaction);
    const session = sessionRef.current;

    const value = useMemo(
        () => ({
            rootRef,
            session,
            interaction,
            layoutRegistry,
        }),
        [interaction, layoutRegistry]
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