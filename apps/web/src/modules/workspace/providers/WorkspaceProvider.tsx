"use client";

import React from "react";
import { WorkspaceContext } from "@/src/modules/workspace/contexts/workspace.context";
import { useWorkspaceMetadata } from "@/src/modules/workspace/hooks/useWorkspaceMetadata";
import { useWorkspaceBreadcrumbs } from "../hooks/useWorkspaceBreadcrumbs";
import { useWorkspaceCache } from "../hooks/useWorkspaceCache";

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
    const metadata = useWorkspaceMetadata();
    const breadcrumbs = useWorkspaceBreadcrumbs();
    const cache = useWorkspaceCache();
    
    const contextValue = React.useMemo(() => {
        return { metadata, breadcrumbs, cache };
    }, [metadata, breadcrumbs, cache]);

    return (
        <WorkspaceContext.Provider value={contextValue}>
            {children}
        </WorkspaceContext.Provider>
    )
}