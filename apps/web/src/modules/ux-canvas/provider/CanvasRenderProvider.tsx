"use client";

import React from "react";
import { CanvasContext } from "@/src/modules/ux-canvas/contexts/canvas.context";
import { useCanvasMetrics } from "../hooks/useCanvasMetrics";
import { CanvasProviderProps } from "../types/canvas.props";
import { useTracingDomain } from "../../t-core/hooks/useTracingDomain";

export function CanvasRenderProvider({ rootRef, metricsId, dataSource, styleSource, children }: CanvasProviderProps) {
    const { selector } = useTracingDomain();
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