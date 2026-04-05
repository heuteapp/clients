"use client";

import React, { useEffect } from "react";
import { DailyboardProvider } from "@/src/modules/ui-dailyboard/provider/DailyboardProvider"
import { LayoutProvider } from "@/src/modules/ui-layout/provider/LayoutProvider"
import { useWorkspaceDailyboard } from "../hooks/useWorkspaceDailyboard"
import { WorkspaceDailyboardContext } from "../contexts/workspace-dailyboard.context";
import { useWorkspaceDailyboardBreadcrumbs } from "../hooks/useWorkspaceDailyboardBreadcrumbs";
import { useDailyboardLoader } from "@/src/heute-store/hooks/useDailyboardLoader";
import { useLayoutDataStore, useLayoutStyleStore } from "@/src/heute-store/stores/layout.stores";
import { useDailyboardStore } from "@/src/heute-store/stores/dailyboard.store";
import { StoredDailyboardRoot } from "@/src/heute-store/types/dailyboard.types";
import { WorkspaceDailyboardMetadata } from "../types/workspace-dailyboard.types";
import { StoredLayoutData } from "@/src/heute-store/types/layout.types";

export function WorkspaceDailyboardProvider({ children }: { children: React.ReactNode }) {
    const metadata = useWorkspaceDailyboard();
    const { loadGlobalLayout, getGlobalLayout } = useLayoutStyleStore();

    useDailyboardLoader();

    const contextValue = React.useMemo(() => {
        return { metadata };
    }, [metadata]);

    useEffect(() => {
        loadGlobalLayout({
            name: "default",
            version: 1,
            box: {},
            sections: [
                {
                    name: "first",
                    box: {
                        padding: 16,
                    }
                },
                {
                    name: "second",
                    box: {
                        padding: 16,
                    }
                }
            ]
        });
    }, [loadGlobalLayout]);

    const { dailyboard, layout } = getDailyboardAndLayout({ metadata });
    const layoutStyle = getGlobalLayout("default", 1);

    return (
        <LayoutProvider dataSource={layout} styleSource={layoutStyle}>
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