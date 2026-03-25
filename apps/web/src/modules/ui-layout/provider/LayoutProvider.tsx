import React from "react";
import { useLayoutRegistry } from "@/src/ui-layout/hooks/useLayoutRegistry";
import { LayoutContext } from "@/src/ui-layout/contexts/layout.context";

export function LayoutProvider({ children }: { children: React.ReactNode }) {
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const registry = useLayoutRegistry(rootRef);
    
    const contextValue = React.useMemo(() => ({
        rootRef, registry
    }), [rootRef, registry]);

    return (
        <LayoutContext.Provider value={contextValue}>
            {children}
        </LayoutContext.Provider>
    );
}