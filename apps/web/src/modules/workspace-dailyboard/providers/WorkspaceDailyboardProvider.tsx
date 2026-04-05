"use client";

import React from "react";
import { DailyboardProvider } from "@/src/modules/ui-dailyboard/provider/DailyboardProvider"
import { LayoutProvider } from "@/src/modules/ui-layout/provider/LayoutProvider"
import { useWorkspaceDailyboard } from "../hooks/useWorkspaceDailyboard"
import { WorkspaceDailyboardContext } from "../contexts/workspace-dailyboard.context";
import { useWorkspaceDailyboardBreadcrumbs } from "../hooks/useWorkspaceDailyboardBreadcrumbs";
import { useDailyboardLoader } from "@/src/heute-store/hooks/useDailyboardLoader";
import { useLayoutDataStore } from "@/src/heute-store/stores/layout.stores";
import { useDailyboardStore } from "@/src/heute-store/stores/dailyboard.store";
import { StoredDailyboardRoot } from "@/src/heute-store/types/dailyboard.types";
import { WorkspaceDailyboardMetadata } from "../types/workspace-dailyboard.types";
import { StoredLayoutData } from "@/src/heute-store/types/layout.types";

export function WorkspaceDailyboardProvider({ children }: { children: React.ReactNode }) {
    const metadata = useWorkspaceDailyboard();

    useDailyboardLoader();

    const contextValue = React.useMemo(() => {
        return { metadata };
    }, [metadata]);

    const { dailyboard, layout } = getDailyboardAndLayout({ metadata });

    return (
        <LayoutProvider dataSource={layout} styleSource={null}>
            <DailyboardProvider source={dailyboard}>
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

const getDailyboardAndLayout = ({ metadata } : { metadata: WorkspaceDailyboardMetadata }) : { dailyboard: StoredDailyboardRoot | null; layout: StoredLayoutData | null } => {
    const { getMeDailyboard } = useDailyboardStore();
    const { getGlobalLayout } = useLayoutDataStore();

    const dailyboard = getMeDailyboard(metadata.categoryPath, metadata.date!);
    if(!dailyboard) return { dailyboard: null, layout: null };

    const layout = getGlobalLayout(dailyboard?.layoutName, dailyboard?.layoutVersion);
    if(!layout) return { dailyboard, layout: null };

    return { dailyboard, layout };
}