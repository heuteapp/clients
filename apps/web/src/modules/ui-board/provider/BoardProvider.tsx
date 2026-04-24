"use client";

import React from "react";
import { useCanvasContext } from "@/src/modules/ui-canvas/hooks/useCanvasContext";
import { useBoardRegistry } from "@/src/modules/ui-board/hooks/useBoardRegistry";
import { BoardContext } from "@/src/modules/ui-board/contexts/board.context";
import { BoardProviderProps } from "../types/board.props";
import { useBoardMetrics } from "../hooks/useBoardMetrics";

export function BoardProvider({ rootRef, metricsId, dataSource, children }: BoardProviderProps) {
    const canvas = useCanvasContext();

    const registry = useBoardRegistry(rootRef, canvas.registry);

    const metrics = useBoardMetrics(metricsId ?? "board", registry);
    
    const contextValue = React.useMemo(() => ({
        dataSource, canvas, registry, metrics
    }), [dataSource, canvas, registry, metrics]);

    return (
        <BoardContext.Provider value={contextValue}>
            {children}
        </BoardContext.Provider>
    );
}