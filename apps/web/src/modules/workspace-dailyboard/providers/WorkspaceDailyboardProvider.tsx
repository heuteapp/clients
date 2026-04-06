"use client";

import React, { useEffect, useState } from "react";
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
import { workspaceDailyboardService } from "../state/workspace-dailyboard.machine";

export function WorkspaceDailyboardProvider({ children }: { children: React.ReactNode }) {
    const metadata = useWorkspaceDailyboard();
    const [state, setState] = useState(() => workspaceDailyboardService.getSnapshot());  
    const { loadGlobalLayout, getGlobalLayout } = useLayoutStyleStore();

    useEffect(() => {
        workspaceDailyboardService.start();

        const subscription = workspaceDailyboardService.subscribe((newState) => {
            setState(newState);
        });
        
        return () =>  {
            subscription.unsubscribe();
            workspaceDailyboardService.stop(); 
        }
    }, []);

    useEffect(() => {
        if(metadata) {
            workspaceDailyboardService.send({ type: "FETCH_SOURCES", dailyboardPath: metadata.categoryPath + "/" + metadata.date?.raw });
            console.log("FETCH_SOURCES sent with path: ", metadata.categoryPath + "/" + metadata.date?.raw);
        }
    }, [metadata]);

    const contextValue = React.useMemo(() => {
        return { metadata, state, send: workspaceDailyboardService.send };
    }, [metadata, state, workspaceDailyboardService.send]);

    useEffect(() => {
        loadGlobalLayout({
            name: "default",
            version: 1,
            box: {},
            sections: [
                {
                    name: "first",
                    box: {
                        padding: "1%",
                        margin: [0, 0, "3%", "5%"]
                    }
                },
                {
                    name: "second",
                    box: {
                        padding: "1%",
                        margin: ["3%", "5%", 0, 0]
                    }
                }
            ]
        });
    }, [loadGlobalLayout]);

    const { dailyboardData, layoutData } = state.context;
    const layoutStyle = getGlobalLayout("default", 1);

    return (
        <LayoutProvider dataSource={layoutData} styleSource={layoutStyle}>
            <DailyboardProvider source={dailyboardData}>
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