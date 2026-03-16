"use client";

import { BoardContext } from "@/src/ui/contexts/board.context";
import { useBoardRuntime } from "@/src/ui/hooks/workspace/useBoardRuntime";
import { BoardContextHooks } from "./BoardContextHooks";

export default function BoardProvider({ rootRef, children }: BoardProviderProps) {
    const context = useBoardRuntime(rootRef);

    return (
        <BoardContext.Provider value={context}>
            <BoardContextHooks />
            {children}
        </BoardContext.Provider>
    );
}

export interface BoardProviderProps {
    rootRef: React.RefObject<HTMLDivElement | null>;
    children: React.ReactNode;
}