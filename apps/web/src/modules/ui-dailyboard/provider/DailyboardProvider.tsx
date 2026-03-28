"use client";

import React from "react";
import { useLayoutContext } from "@/src/modules/ui-layout/hooks/useLayoutContext";
import { useDailyboardRegistry } from "@/src/modules/ui-dailyboard/hooks/useDailyboardRegistry";
import { DailyboardContext } from "@/src/modules/ui-dailyboard/contexts/dailyboard.context";

export function DailyboardProvider({ children }: { children: React.ReactNode }) {
    const layout = useLayoutContext();

    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const registry = useDailyboardRegistry(rootRef, layout.registry);
    
    const contextValue = React.useMemo(() => ({
        layout, rootRef, registry
    }), [layout, rootRef, registry]);

    return (
        <DailyboardContext.Provider value={contextValue}>
            {children}
        </DailyboardContext.Provider>
    );
}