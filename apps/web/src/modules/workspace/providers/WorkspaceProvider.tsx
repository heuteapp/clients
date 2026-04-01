"use client";

import React, { useEffect } from "react";
import { WorkspaceContext } from "@/src/modules/workspace/contexts/workspace.context";
import { useWorkspaceMetadata } from "@/src/modules/workspace/hooks/useWorkspaceMetadata";
import { useWorkspaceBreadcrumbs } from "../hooks/useWorkspaceBreadcrumbs";
import { useWorkspaceCache } from "../hooks/useWorkspaceCache";

import { useQuery } from "@tanstack/react-query";
import { heuteApi } from "@/src/api/heuteApi";
import { useCategoryStore } from "@/src/heute-store/stores/category.store";
import { useAuthContext } from "../../ui-auth/hooks/useAuthContext";

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
    const { state } = useAuthContext();
    const metadata = useWorkspaceMetadata();
    const breadcrumbs = useWorkspaceBreadcrumbs();
    const cache = useWorkspaceCache();
    
    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: () => heuteApi.me.categories.getHierarchy(),
        enabled: state.matches("authenticated")
    });

    const { loadMe } = useCategoryStore();

    useEffect(() => {
        if (categories) {
            loadMe(categories);
        }
    }, [categories, loadMe]);
    
    const contextValue = React.useMemo(() => {
        return { metadata, breadcrumbs, cache };
    }, [metadata, breadcrumbs, cache]);

    return (
        <WorkspaceContext.Provider value={contextValue}>
            {children}
        </WorkspaceContext.Provider>
    )
}