"use client";

import React from "react";
import { useLayoutContext } from "@/src/modules/ui-layout/hooks/useLayoutContext";
import { useDailyboardRegistry } from "@/src/modules/ui-dailyboard/hooks/useDailyboardRegistry";
import { DailyboardContext } from "@/src/modules/ui-dailyboard/contexts/dailyboard.context";
import { DailyboardProviderProps } from "../types/dailyboard.props";

export function DailyboardProvider({ dataSource, children }: DailyboardProviderProps) {
    const layout = useLayoutContext();

    const dailyboardRef = React.useRef<HTMLDivElement | null>(null);
    const registry = useDailyboardRegistry(dailyboardRef, layout.registry);
    
    const contextValue = React.useMemo(() => ({
        dataSource, layout, registry
    }), [dataSource, layout, registry]);

    return (
        <DailyboardContext.Provider value={contextValue}>
            {children}
        </DailyboardContext.Provider>
    );
}