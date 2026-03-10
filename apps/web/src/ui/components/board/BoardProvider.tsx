"use client";

import { BoardContext } from "@/src/ui/contexts/board.context";
import { useBoardRuntime } from "@/src/ui/hooks/board/useBoardRuntime";
import { useBoardPointerEvents } from "../../hooks/board";

export default function BoardProvider({ rootRef, children }: BoardProviderProps) {
    const context = useBoardRuntime(rootRef);
    
    useBoardPointerEvents(context);

    return (
        <BoardContext.Provider value={context}>
            {children}
        </BoardContext.Provider>
    );
}

export interface BoardProviderProps {
    rootRef: React.RefObject<HTMLDivElement | null>;
    children: React.ReactNode;
}