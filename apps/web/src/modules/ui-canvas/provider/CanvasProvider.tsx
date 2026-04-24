"use client";

import React from "react";
import { CanvasContext } from "@/src/modules/ui-canvas/contexts/canvas.context";
import { useCanvasMetrics } from "../hooks/useCanvasMetrics";
import { CanvasProviderProps } from "../types/canvas.props";
import { useTracingStore } from "../../t-shared/hooks/useTracingStore";

export function CanvasProvider({ rootRef, metricsId, dataSource, styleSource, children }: CanvasProviderProps) {

    const { domains } = useTracingStore();

    const tracingName = "w-dailyboard";

    const selector = React.useMemo(() => {
        if(tracingName && domains[tracingName]) {
            return domains[tracingName];
        }
        return null;
    }, [domains[tracingName]])!;
        
    const metrics = useCanvasMetrics(metricsId ?? "canvas", selector, dataSource, styleSource);

    const contextValue = React.useMemo(() => ({
        rootRef, dataSource, styleSource, selector, metrics
    }), [rootRef, dataSource, styleSource, selector, metrics]);

    return (
        <CanvasContext.Provider value={contextValue}>
            {children}
        </CanvasContext.Provider>
    );
}