"use client";

import { useMemo } from "react";
import { BoardContext } from "../board.context";
import { createBoardSession } from "../board.session";
import { createBoardInteraction } from "../board.interaction";
import { useBoardInteraction, useBoardPointerEvents, useBoardSession } from "../board.hooks";
import { useLayoutMeasurements, useLayoutRegistry } from "@/src/domain/layout/layout.hooks";

export default function BoardProvider({ children, rootRef }: BoardProviderProps) {


    const layoutRegistry = useLayoutRegistry();

    const [session, sessionSetter] = useBoardSession();
    const interaction = useBoardInteraction(sessionSetter);

    useBoardPointerEvents(rootRef, session, interaction);

    const value = useMemo(
        () => ({
            rootRef,
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