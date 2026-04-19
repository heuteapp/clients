"use client";

import React from "react";
import { useLayoutContext } from "@/src/modules/ui-layout/hooks/useLayoutContext";
import { useDailyboardRegistry } from "@/src/modules/ui-dailyboard/hooks/useDailyboardRegistry";
import { DailyboardContext } from "@/src/modules/ui-dailyboard/contexts/dailyboard.context";
import { DailyboardProviderProps } from "../types/dailyboard.props";
import { useDailyboardMetrics } from "../hooks/useDailyboardMetrics";

export function DailyboardProvider({ rootRef, metricsId, dataSource, children }: DailyboardProviderProps) {
    const layout = useLayoutContext();

    const registry = useDailyboardRegistry(rootRef, layout.registry);

    const metrics = useDailyboardMetrics(metricsId ?? "dailyboard", registry);
    
    const contextValue = React.useMemo(() => ({
        dataSource, layout, registry, metrics
    }), [dataSource, layout, registry, metrics]);

    return (
        <DailyboardContext.Provider value={contextValue}>
            {children}
        </DailyboardContext.Provider>
    );
}