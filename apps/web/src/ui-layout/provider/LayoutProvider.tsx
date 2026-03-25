import React from "react";
import { useLayoutRegistry } from "@/src/ui-layout/hooks/useLayoutRegistry";
import { LayoutContext } from "@/src/ui-layout/contexts/layout.context";

export function LayoutProvider({ children }: { children: React.ReactNode }) {
    const layoutRef = React.useRef<HTMLDivElement | null>(null);
    const layoutRegistry = useLayoutRegistry(layoutRef);
    
    const contextValue = React.useMemo(() => ({
        layoutRef, layoutRegistry
    }), [layoutRef, layoutRegistry]);

    return (
        <LayoutContext.Provider value={contextValue}>
            {children}
        </LayoutContext.Provider>
    );
}