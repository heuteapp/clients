import { useEffect } from "react";
import { useWorkspaceContext } from "@/src/modules/workspace/hooks/useWorkspaceContext";
import { WorkspaceBoardCategoriesBC } from "../components/WorkspaceBoardCategoriesBC";

export const useWorkspaceBoardBreadcrumbs = () => {
    const context = useWorkspaceContext();
    const { segmentsResult, breadcrumbs } = context.metadata;
    
    useEffect(() => {
        breadcrumbs.setItems([
            {
                name: "board",
                href: "/workspace/board"
            },
            {
                name: "categories",
                element: WorkspaceBoardCategoriesBC
            }
        ]);
    }, [segmentsResult])
}