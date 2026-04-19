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
import { WorkspaceDailyboardCardDialog } from "../components/WorkspaceDailyboardCardDialog";

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
        workspaceDailyboardService.send({ type: "SOURCES_FETCH_REQUESTED", dailyboardPath: metadata.categoryPath + "/" + metadata.date?.raw });
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
                        <WorkspaceDailyboardStateSideEffects />
                        <ProviderContent>
                            {children}
                        </ProviderContent>
                        <WorkspaceDailyboardCardDialog />
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