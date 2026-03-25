"use client";

import React from "react";
import { BoardProvider } from "@/src/modules/ui-board/provider/BoardProvider"
import { LayoutProvider } from "@/src/modules/ui-layout/provider/LayoutProvider"
import { useWorkspaceBoard } from "../hooks/useWorkspaceBoard"
import { WorkspaceBoardContext } from "../contexts/workspace-board.context";

export function WorkspaceBoardProvider({ children }: { children: React.ReactNode }) {
    const metadata = useWorkspaceBoard();

    const contextValue = React.useMemo(() => {
        return { metadata };
    }, [metadata]);

    return (
        <>
            <LayoutProvider>
                <BoardProvider>
                    <WorkspaceBoardContext.Provider value={contextValue}>
                        {children}
                    </WorkspaceBoardContext.Provider>
                </BoardProvider>
            </LayoutProvider>
        </>
    )
}