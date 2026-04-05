"use client";

import React from "react";
import { useLayoutRegistry } from "@/src/modules/ui-layout/hooks/useLayoutRegistry";
import { LayoutContext } from "@/src/modules/ui-layout/contexts/layout.context";
import { useLayoutMetrics } from "../hooks/useLayoutMetrics";
import { LayoutProviderProps } from "../types/layout.props";

export function LayoutProvider({ dataSource, styleSource, children }: LayoutProviderProps) {
    const layoutRef = React.useRef<HTMLDivElement | null>(null);
    const registry = useLayoutRegistry(layoutRef);

    useLayoutMetrics(registry);

    const contextValue = React.useMemo(() => ({
        dataSource, styleSource, registry
    }), [dataSource, styleSource, registry]);

    return (
        <LayoutContext.Provider value={contextValue}>
            {children}
        </LayoutContext.Provider>
    );
}