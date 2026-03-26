"use client";

import React from "react";
import { WorkspaceContext } from "@/src/modules/workspace/contexts/workspace.context";
import { useWorkspace } from "@/src/modules/workspace/hooks/useWorkspace";

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
    const metadata = useWorkspace();

    const contextValue = React.useMemo(() => {
        return { metadata };
    }, [metadata]);

    return (
        <>
            <WorkspaceContext.Provider value={contextValue}>
                {children}
            </WorkspaceContext.Provider>
        </>
    )
}