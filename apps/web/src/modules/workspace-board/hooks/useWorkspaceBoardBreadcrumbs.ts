import { useEffect } from "react";
import { useWorkspaceContext } from "@/src/modules/workspace/hooks/useWorkspaceContext";
import { WorkspaceBoardCategoriesBC } from "../components/WorkspaceBoardCategoriesBC";
import { WorkspaceBoardDateView } from "../components/WorkspaceBoardDateView";

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
            },
            {
                name: "date",
                element: WorkspaceBoardDateView
            }
        ]);
    }, [segmentsResult])
}