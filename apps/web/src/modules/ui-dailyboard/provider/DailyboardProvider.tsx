"use client";

import React from "react";
import { useCanvasContext } from "@/src/modules/ui-canvas/hooks/useCanvasContext";
import { useDailyboardRegistry } from "@/src/modules/ui-dailyboard/hooks/useDailyboardRegistry";
import { DailyboardContext } from "@/src/modules/ui-dailyboard/contexts/dailyboard.context";
import { DailyboardProviderProps } from "../types/dailyboard.props";
import { useDailyboardMetrics } from "../hooks/useDailyboardMetrics";

export function DailyboardProvider({ rootRef, metricsId, dataSource, children }: DailyboardProviderProps) {
    const canvas = useCanvasContext();

    const registry = useDailyboardRegistry(rootRef, canvas.registry);

    const metrics = useDailyboardMetrics(metricsId ?? "dailyboard", registry);
    
    const contextValue = React.useMemo(() => ({
        dataSource, canvas, registry, metrics
    }), [dataSource, canvas, registry, metrics]);

    return (
        <DailyboardContext.Provider value={contextValue}>
            {children}
        </DailyboardContext.Provider>
    );
}