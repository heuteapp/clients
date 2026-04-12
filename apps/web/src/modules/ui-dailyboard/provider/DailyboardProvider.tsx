"use client";

import React from "react";
import { useLayoutContext } from "@/src/modules/ui-layout/hooks/useLayoutContext";
import { useDailyboardRegistry } from "@/src/modules/ui-dailyboard/hooks/useDailyboardRegistry";
import { DailyboardContext } from "@/src/modules/ui-dailyboard/contexts/dailyboard.context";
import { DailyboardProviderProps } from "../types/dailyboard.props";
import { useDailyboardMetrics } from "../hooks/useDailyboardMetrics";

export function DailyboardProvider({ metricsId, dataSource, children }: DailyboardProviderProps) {
    const layout = useLayoutContext();

    const dailyboardRef = React.useRef<HTMLDivElement | null>(null);
    const registry = useDailyboardRegistry(dailyboardRef, layout.registry);

    const metrics = useDailyboardMetrics(metricsId ?? "dailyboard", registry, layout.metrics);
    
    const contextValue = React.useMemo(() => ({
        dataSource, layout, registry, metrics
    }), [dataSource, layout, registry, metrics]);

    return (
        <DailyboardContext.Provider value={contextValue}>
            {children}
        </DailyboardContext.Provider>
    );
}