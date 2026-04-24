"use client";

import React from "react";
import { useCanvasContext } from "@/src/modules/ui-canvas/hooks/useCanvasContext";
import { BoardContext } from "@/src/modules/ui-board/contexts/board.context";
import { BoardProviderProps } from "../types/board.props";
import { useBoardMetrics } from "../hooks/useBoardMetrics";
import { useTracingStore } from "../../t-core/hooks/useTracingStore";

export function BoardRenderProvider({ rootRef, metricsId, dataSource, children }: BoardProviderProps) {
    const canvas = useCanvasContext();

    const { domains } = useTracingStore();

    const tracingName = "w-dailyboard";

    const selector = React.useMemo(() => {
        if(tracingName && domains[tracingName]) {
            return domains[tracingName];
        }
        return null;
    }, [domains[tracingName]])!;

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