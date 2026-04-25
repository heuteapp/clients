"use client";

import React from "react";
import { useCanvasContext } from "@/src/modules/ui-canvas/hooks/useCanvasContext";
import { BoardContext } from "@/src/modules/ui-board/contexts/board.context";
import { BoardProviderProps } from "../types/board.props";
import { useBoardMetrics } from "../hooks/useBoardMetrics";
import { useTracingStore } from "../../t-core/hooks/useTracingStore";
import { useTracingDomain } from "../../t-core/hooks/useTracingDomain";

export function BoardRenderProvider({ rootRef, metricsId, dataSource, children }: BoardProviderProps) {
    const canvas = useCanvasContext();

    const { selector } = useTracingDomain();

    const metrics = useBoardMetrics(metricsId ?? "board", selector);
    
    const contextValue = React.useMemo(() => ({
        rootRef, dataSource, canvas, selector, metrics
    }), [rootRef, dataSource, canvas, selector, metrics]);

    return (
        <BoardContext.Provider value={contextValue}>
            {children}
        </BoardContext.Provider>
    );
}