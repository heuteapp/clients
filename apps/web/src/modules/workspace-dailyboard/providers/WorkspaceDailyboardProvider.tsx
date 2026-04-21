"use client";

import React, { useEffect, useState } from "react";
import { DailyboardProvider } from "@/src/modules/ui-dailyboard/provider/DailyboardProvider"
import { LayoutProvider } from "@/src/modules/ui-layout/provider/LayoutProvider"
import { useWorkspaceDailyboard } from "../hooks/useWorkspaceDailyboard"
import { WorkspaceDailyboardContext } from "../contexts/workspace-dailyboard.context";
import { useWorkspaceDailyboardBreadcrumbs } from "../hooks/useWorkspaceDailyboardBreadcrumbs";
import { useLayoutStyleStore } from "@/src/heute-store/stores/layout.stores";
import { workspaceDailyboardService } from "../state/workspace-dailyboard.machine";
import { WorkspaceDailyboardStateHooks } from "../components/WorkspaceDailyboardStateHooks";
import { MetricsProvider } from "../../ui-shared/providers/MetricsProvider";
import { useWorkspaceDailyboardContext } from "../hooks/useWorkspaceDailyboardContext";
import { WorkspaceDailyboardDialogs } from "../components/WorkspaceDailyboardDialogs";

export function WorkspaceDailyboardProvider({ children }: { children: React.ReactNode }) {
    const metadata = useWorkspaceDailyboard();
    const [state, setState] = useState(() => workspaceDailyboardService.getSnapshot());  
    const { loadGlobalLayout, getGlobalLayout } = useLayoutStyleStore();

    const dailyboardRef = React.useRef<HTMLDivElement | null>(null);
    const layoutRef = React.useRef<HTMLDivElement | null>(null);

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
        workspaceDailyboardService.send({ type: "SOURCES_FETCH_REQUEST", dailyboardPath: metadata.categoryPath + "/" + metadata.date?.raw });
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
                        padding: [0, 0, "2%", 0],
                    }
                },
                {
                    name: "second",
                    box: {                        
                        padding: ["2%", 0, 0, 0],
                    }
                }
            ]
        });
    }, [loadGlobalLayout]);

    const { dailyboardData, layoutData } = state.context;
    const layoutStyle = getGlobalLayout("default", 1);

    return (
        <MetricsProvider rootRef={dailyboardRef} targets={["layout", "dailyboard"]}>
            <LayoutProvider rootRef={layoutRef} metricsId="layout"  dataSource={layoutData} styleSource={layoutStyle}>
                <DailyboardProvider rootRef={dailyboardRef} metricsId="dailyboard" dataSource={dailyboardData}>
                    <WorkspaceDailyboardContext.Provider value={contextValue}>
                        <ProviderContent>
                            {children}
                        </ProviderContent>
                        <WorkspaceDailyboardDialogs />
                        <WorkspaceDailyboardStateHooks />
                    </WorkspaceDailyboardContext.Provider>
                </DailyboardProvider>
            </LayoutProvider>
        </MetricsProvider>
    )
}

const ProviderContent = ({ children }: { children: React.ReactNode }) => {
    useWorkspaceDailyboardBreadcrumbs();
    const { state } = useWorkspaceDailyboardContext();

    return (
        <>
            {children}
            {process.env.NODE_ENV === "development" && (
                <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", color: "white", padding: "4px 8px", fontSize: "14px", borderRadius: "4px 4px 0 0", zIndex: 9999 }}>
                    W-Dailyboard: {JSON.stringify(state.value)}
                </div>
            )}
        </>
    )
}