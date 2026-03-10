"use client";

import { BoardContext } from "@/src/ui/contexts/board.context";
import { useBoardRuntime } from "@/src/ui/hooks/board/useBoardRuntime";

export default function BoardProvider({ rootRef, children }: BoardProviderProps) {
    const value = useBoardRuntime(rootRef);

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