"use client";

import React, { useEffect, useState } from "react";
import { DailyboardProvider } from "@/src/modules/ui-dailyboard/provider/DailyboardProvider"
import { LayoutProvider } from "@/src/modules/ui-layout/provider/LayoutProvider"
import { useWorkspaceDailyboard } from "../hooks/useWorkspaceDailyboard"
import { WorkspaceDailyboardContext } from "../contexts/workspace-dailyboard.context";
import { useWorkspaceDailyboardBreadcrumbs } from "../hooks/useWorkspaceDailyboardBreadcrumbs";
import { useLayoutStyleStore } from "@/src/heute-store/stores/layout.stores";
import { workspaceDailyboardService } from "../state/workspace-dailyboard.machine";
import { WorkspaceDailyboardStateSideEffects } from "./WorkspaceDailyboardStateSideEffects";
import { MetricsProvider } from "../../ui-shared/providers/MetricsProvider";

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
        workspaceDailyboardService.send({ type: "FETCH_SOURCES_REQUESTED", dailyboardPath: metadata.categoryPath + "/" + metadata.date?.raw });
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
                        padding: ["2%", 0],
                    }
                },
                {
                    name: "second",
                    box: {
                        padding: ["2%", 0],
                    }
                }
            ]
        });
    }, [loadGlobalLayout]);

    const { dailyboardData, layoutData } = state.context;
    const layoutStyle = getGlobalLayout("default", 1);

    return (
        <MetricsProvider targets={["layout", "dailyboard"]}>
            <LayoutProvider dataSource={layoutData} styleSource={layoutStyle}>
                <DailyboardProvider dataSource={dailyboardData}>
                    <WorkspaceDailyboardContext.Provider value={contextValue}>
                        <WorkspaceDailyboardStateSideEffects />
                        <ProviderContent>
                            {children}
                        </ProviderContent>
                    </WorkspaceDailyboardContext.Provider>
                </DailyboardProvider>
            </LayoutProvider>
        </MetricsProvider>
    )
}

const ProviderContent = ({ children }: { children: React.ReactNode }) => {
    useWorkspaceDailyboardBreadcrumbs();
    return <>{children}</>
}