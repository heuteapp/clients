import React from "react";
import { useLayoutRegistry } from "@/src/ui-layout/hooks/useLayoutRegistry";
import { useBoardRegistry } from "../hooks/useBoardRegistry";
import { BoardContext } from "../contexts/board.context";

export function BoardProvider({ children }: { children: React.ReactNode }) {
    const layoutRef = React.useRef<HTMLDivElement | null>(null);
    const boardRef = React.useRef<HTMLDivElement | null>(null);

    const layoutRegistry = useLayoutRegistry(layoutRef);
    const boardRegistry = useBoardRegistry(boardRef, layoutRegistry);
    
    const contextValue = React.useMemo(() => ({
        boardRef, layoutRef, registry: boardRegistry
    }), [boardRef, layoutRef, boardRegistry]);

    return (
        <BoardContext.Provider value={contextValue}>
            {children}
        </BoardContext.Provider>
    );
}