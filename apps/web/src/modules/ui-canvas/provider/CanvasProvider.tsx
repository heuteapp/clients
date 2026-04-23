"use client";

import React from "react";
import { useCanvasRegistry } from "@/src/modules/ui-canvas/hooks/useCanvasRegistry";
import { CanvasContext } from "@/src/modules/ui-canvas/contexts/canvas.context";
import { useCanvasMetrics } from "../hooks/useCanvasMetrics";
import { CanvasProviderProps } from "../types/canvas.props";

export function CanvasProvider({ rootRef, metricsId, dataSource, styleSource, children }: CanvasProviderProps) {
    const registry = useCanvasRegistry(rootRef);

    const metrics = useCanvasMetrics(metricsId ?? "canvas", registry, dataSource, styleSource);

    const contextValue = React.useMemo(() => ({
        dataSource, styleSource, registry, metrics
    }), [dataSource, styleSource, registry, metrics]);

    return (
        <CanvasContext.Provider value={contextValue}>
            {children}
        </CanvasContext.Provider>
    );
}