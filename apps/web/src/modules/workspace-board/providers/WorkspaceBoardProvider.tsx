import { BoardProvider } from "@/src/modules/ui-board/provider/BoardProvider"
import { LayoutProvider } from "@/src/modules/ui-layout/provider/LayoutProvider"
import { useWorkspaceBoard } from "../hooks/useWorkspaceBoard"

export function WorkspaceBoardProvider() {
    const metadata = useWorkspaceBoard();

    return (
        <>
            <LayoutProvider>
                <BoardProvider>
                    {metadata && (
                        <div>
                            <h1>Workspace Board</h1>
                            <p>Categories: {metadata.categories.join(", ")}</p>
                            <p>Category Depth: {metadata.categoryDepth}</p>
                        </div>
                    )}
                </BoardProvider>
            </LayoutProvider>
        </>
    )
}