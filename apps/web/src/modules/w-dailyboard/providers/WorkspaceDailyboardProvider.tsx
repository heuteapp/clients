"use client";

import React, { useEffect, useState } from "react";
import { BoardRenderProvider } from "@/src/modules/ui-board/provider/BoardRenderProvider"
import { CanvasRenderProvider } from "@/src/modules/ui-canvas/provider/CanvasRenderProvider"
import { useWorkspaceDailyboard } from "../hooks/useWorkspaceDailyboard"
import { WorkspaceDailyboardContext } from "../contexts/workspace-dailyboard.context";
import { useWorkspaceDailyboardBreadcrumbs } from "../hooks/useWorkspaceDailyboardBreadcrumbs";
import { useCanvasStyleStore } from "@/src/heute-store/stores/canvas.stores";
import { workspaceDailyboardService } from "../state/workspace-dailyboard.machine";
import { WorkspaceDailyboardStateHooks } from "../components/WorkspaceDailyboardStateHooks";
import { MetricsProvider } from "../../ui-core/providers/MetricsProvider";
import { useWorkspaceDailyboardContext } from "../hooks/useWorkspaceDailyboardContext";
import { WorkspaceDailyboardDialogs } from "../components/WorkspaceDailyboardDialogs";
import { TracingDomainProvider } from "../../t-core/providers/TracingDomainProvider";

export function WorkspaceDailyboardProvider({ children }: { children: React.ReactNode }) {
    const metadata = useWorkspaceDailyboard();
    const [state, setState] = useState(() => workspaceDailyboardService.getSnapshot());  
    const { loadGlobalCanvas, getGlobalCanvas } = useCanvasStyleStore();

    const dailyboardRef = React.useRef<HTMLDivElement | null>(null);
    const canvasRef = React.useRef<HTMLDivElement | null>(null);

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
        loadGlobalCanvas({
            name: "default",
            version: 1,
            box: {},
            grids: [
                {
                    name: "first",
                    box: {                        
                        margin: [0, 0, "2%", 0],
                    }
                },
                {
                    name: "second",
                    box: {                        
                        margin: ["2%", 0, 0, 0],
                    }
                }
            ]
        });
    }, [loadGlobalCanvas]);

    const { dailyboardData, canvasData } = state.context;
    const canvasStyle = getGlobalCanvas("default", 1);

    return (
        <TracingDomainProvider name="w-dailyboard" >
            <MetricsProvider rootRef={dailyboardRef} targets={["canvas", "dailyboard"]}>
                <CanvasRenderProvider rootRef={canvasRef} metricsId="canvas"  dataSource={canvasData} styleSource={canvasStyle}>
                    <BoardRenderProvider rootRef={dailyboardRef} metricsId="dailyboard" dataSource={dailyboardData}>
                        <WorkspaceDailyboardContext.Provider value={contextValue}>
                            <ProviderContent>
                                {children}
                            </ProviderContent>
                            <WorkspaceDailyboardDialogs />
                            <WorkspaceDailyboardStateHooks />
                        </WorkspaceDailyboardContext.Provider>
                    </BoardRenderProvider>
                </CanvasRenderProvider>
            </MetricsProvider>        
        </TracingDomainProvider>
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