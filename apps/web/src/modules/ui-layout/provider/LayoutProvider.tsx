"use client";

import React from "react";
import { useLayoutRegistry } from "@/src/modules/ui-layout/hooks/useLayoutRegistry";
import { LayoutContext } from "@/src/modules/ui-layout/contexts/layout.context";
import { useLayoutMetrics } from "../hooks/useLayoutMetrics";

export function LayoutProvider({ children }: { children: React.ReactNode }) {
    const layoutRef = React.useRef<HTMLDivElement | null>(null);
    const registry = useLayoutRegistry(layoutRef);

    useLayoutMetrics(registry);

    const contextValue = React.useMemo(() => ({
        registry
    }), [registry]);

    return (
        <LayoutContext.Provider value={contextValue}>
            {children}
        </LayoutContext.Provider>
    );
}