import { useEffect } from "react";
import { useWorkspaceContext } from "@/src/modules/workspace/hooks/useWorkspaceContext";
import { WorkspaceBoardCategoriesBreadcrumb } from "../components/WorkspaceBoardCategoriesBreadcrumb";
import { WorkspaceBoardDateBreadcrumb } from "../components/WorkspaceBoardDateBreadcrumb";
import { useWorkspaceBoardContext } from "./useWorkspaceBoardContext";

export const useWorkspaceBoardBreadcrumbs = () => {
    const context = useWorkspaceContext();
    const { breadcrumbs } = context.metadata;

    const boardContext = useWorkspaceBoardContext();
    const { categories, date } = boardContext.metadata;
    
    useEffect(() => {
        const items = [
            {
                name: "board",
                href: "/workspace/board"
            },
            {
                name: "categories",
                element: WorkspaceBoardCategoriesBreadcrumb
            }
        ];

        if(categories.length > 0) {
            items.push({
                name: "date",
                element: WorkspaceBoardDateBreadcrumb
            });
        }

        breadcrumbs.setItems(items);

    }, [categories, date]);
}