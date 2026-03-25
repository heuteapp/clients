import { BoardProvider } from "@/src/modules/ui-board/provider/BoardProvider"
import { LayoutProvider } from "@/src/modules/ui-layout/provider/LayoutProvider"

export const useWorkspaceBoard = () => {
    return (
        <>
            <LayoutProvider>
                <BoardProvider>
                    Workspace Board
                </BoardProvider>
            </LayoutProvider>
        </>
    )
}