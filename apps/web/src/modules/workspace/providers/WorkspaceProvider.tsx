"use client";

import React, { useEffect } from "react";
import { WorkspaceContext } from "@/src/modules/workspace/contexts/workspace.context";
import { useWorkspaceMetadata } from "@/src/modules/workspace/hooks/useWorkspaceMetadata";
import { useWorkspaceBreadcrumbs } from "../hooks/useWorkspaceBreadcrumbs";
import { useWorkspaceCache } from "../hooks/useWorkspaceCache";

import { useQuery } from "@tanstack/react-query";
import { heuteApi } from "@/src/api/heuteApi";

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
    const metadata = useWorkspaceMetadata();
    const breadcrumbs = useWorkspaceBreadcrumbs();
    const cache = useWorkspaceCache();

    const { data: categories, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: () => heuteApi.me.categories.getHierarchy()
    });

    useEffect(() => {
        console.log("Fetched categories:", categories);
    }, [categories]);
    
    const contextValue = React.useMemo(() => {
        return { metadata, breadcrumbs, cache };
    }, [metadata, breadcrumbs, cache]);

    return (
        <WorkspaceContext.Provider value={contextValue}>
            {children}
        </WorkspaceContext.Provider>
    )
}