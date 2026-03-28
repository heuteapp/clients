"use client";

import React from "react";
import { DailyboardProvider } from "@/src/modules/ui-dailyboard/provider/DailyboardProvider"
import { LayoutProvider } from "@/src/modules/ui-layout/provider/LayoutProvider"
import { useWorkspaceDailyboard } from "../hooks/useWorkspaceDailyboard"
import { WorkspaceDailyboardContext } from "../contexts/workspace-dailyboard.context";
import { useWorkspaceDailyboardBreadcrumbs } from "../hooks/useWorkspaceDailyboardBreadcrumbs";

export function WorkspaceDailyboardProvider({ children }: { children: React.ReactNode }) {
    const metadata = useWorkspaceDailyboard();

    const contextValue = React.useMemo(() => {
        return { metadata };
    }, [metadata]);

    return (
        <LayoutProvider>
            <DailyboardProvider>
                <WorkspaceDailyboardContext.Provider value={contextValue}>
                    <ProviderContent>
                        {children}
                    </ProviderContent>
                </WorkspaceDailyboardContext.Provider>
            </DailyboardProvider>
        </LayoutProvider>
    )
}

const ProviderContent = ({ children }: { children: React.ReactNode }) => {
    useWorkspaceDailyboardBreadcrumbs();

    return (
        <>{children}</>
    )
}