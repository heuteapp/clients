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
    }, [categories, date]);
}