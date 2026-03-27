import { useEffect } from "react";
import { useWorkspaceContext } from "@/src/modules/workspace/hooks/useWorkspaceContext";

export const useWorkspaceBoardBreadcrumbs = () => {
    const context = useWorkspaceContext();
    const { segmentsResult, breadcrumbs } = context.metadata;
    
    useEffect(() => {
        breadcrumbs.setItems([
            {
                name: "board",
                href: "/workspace/board"
            }
        ]);
    }, [segmentsResult])
}