"use client";

import { useMemo } from "react";
import { BoardContext } from "../board.context";
import { useBoardInteraction, useBoardPointerEvents, useBoardSession } from "../board.hooks";
import { useLayoutRegistry } from "@/src/domain/layout/layout.hooks";

export default function BoardProvider({ children, rootRef }: BoardProviderProps) {


    const layoutRegistry = useLayoutRegistry();

    const [session, sessionSetter] = useBoardSession();
    const interaction = useBoardInteraction(sessionSetter);

    useBoardPointerEvents(rootRef, session, interaction);

    const value = useMemo(
        () => ({
            rootRef,
            session,
            interaction,
            layoutRegistry,
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