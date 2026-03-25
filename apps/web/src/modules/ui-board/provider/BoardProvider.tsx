import React from "react";
import { useLayoutContext } from "@/src/ui-layout/hooks/useLayoutContext";
import { useBoardRegistry } from "@/src/ui-board/hooks/useBoardRegistry";
import { BoardContext } from "@/src/ui-board/contexts/board.context";

export function BoardProvider({ children }: { children: React.ReactNode }) {
    const layout = useLayoutContext();

    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const registry = useBoardRegistry(rootRef, layout.registry);
    
    const contextValue = React.useMemo(() => ({
        layout, rootRef, registry
    }), [layout, rootRef, registry]);

    return (
        <BoardContext.Provider value={contextValue}>
            {children}
        </BoardContext.Provider>
    );
}