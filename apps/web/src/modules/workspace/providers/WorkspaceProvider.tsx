"use client";

import React from "react";
import { WorkspaceContext } from "@/src/modules/workspace/contexts/workspace.context";
import { useWorkspaceMetadata } from "@/src/modules/workspace/hooks/useWorkspaceMetadata";
import { useWorkspaceBreadcrumbs } from "../hooks/useWorspaceBreadcrumbs";

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
    const metadata = useWorkspaceMetadata();
    const breadcrumbs = useWorkspaceBreadcrumbs();
    
    const contextValue = React.useMemo(() => {
        return { metadata, breadcrumbs, boardCache: null! };
    }, [metadata]);

    return (
        <>
            <WorkspaceContext.Provider value={contextValue}>
                {children}
            </WorkspaceContext.Provider>
        </>
    )
}