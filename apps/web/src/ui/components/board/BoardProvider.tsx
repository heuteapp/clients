"use client";

import { BoardContext } from "@/src/ui/contexts/board.context";
import { useBoardRuntime } from "@/src/ui/hooks/board/useBoardRuntime";
import { useBoardPointerEvents } from "@/src/ui/hooks/board/useBoardPointerEvents";
import { useBoardMetricsObserver } from "@/src/ui/hooks/board/useBoardMetricsObserver";

export default function BoardProvider({ rootRef, children }: BoardProviderProps) {
    const context = useBoardRuntime(rootRef);
    
    useBoardMetricsObserver(context);
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