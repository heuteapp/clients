import { useEffect } from "react";
import { useWorkspaceContext } from "@/src/modules/workspace/hooks/useWorkspaceContext";
import { WorkspaceBoardCategoriesBC } from "../components/WorkspaceBoardCategoriesBC";
import { WorkspaceBoardDateView } from "../components/WorkspaceBoardDateView";
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
                element: WorkspaceBoardCategoriesBC
            }
        ];

        if(categories.length > 0) {
            items.push({
                name: "date",
                element: WorkspaceBoardDateView
            });
        }

        breadcrumbs.setItems(items);

    }, [categories, date]);
}