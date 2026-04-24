"use client";

import React from "react";
import { WorkspaceContext } from "@/src/modules/w-core/contexts/workspace.context";
import { useWorkspaceMetadata } from "@/src/modules/w-core/hooks/useWorkspaceMetadata";
import { useWorkspaceBreadcrumbs } from "../hooks/useWorkspaceBreadcrumbs";
import { useCategoriesLoader } from "@/src/heute-store/hooks/useCategoriesLoader";
import { TracingStoreProvider } from "../../t-core/providers/TracingStoreProvider";

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
    const metadata = useWorkspaceMetadata();
    const breadcrumbs = useWorkspaceBreadcrumbs();

    useCategoriesLoader();

    const contextValue = React.useMemo(() => {
        return { metadata, breadcrumbs };
    }, [metadata, breadcrumbs]);

    return (
        <TracingStoreProvider>
            <WorkspaceContext.Provider value={contextValue}>
                {children}
            </WorkspaceContext.Provider>
        </TracingStoreProvider>
    )
}