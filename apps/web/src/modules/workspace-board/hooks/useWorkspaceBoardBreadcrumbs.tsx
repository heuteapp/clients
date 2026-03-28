import { useEffect, useMemo } from "react";
import { useWorkspaceContext } from "@/src/modules/workspace/hooks/useWorkspaceContext";
import { WorkspaceBoardCategoriesBreadcrumb } from "../components/WorkspaceBoardCategoriesBreadcrumb";
import { WorkspaceBoardDateBreadcrumb } from "../components/WorkspaceBoardDateBreadcrumb";
import { useWorkspaceBoardContext } from "./useWorkspaceBoardContext";
import { HeuteLink } from "../../ui-shared/components/HeuteLink";
import { HeuteAnimatedBreadcrumbsItem } from "../../ui-shared/types/components/heute-breadcrumbs.types";

export const useWorkspaceBoardBreadcrumbs = () => {
    const context = useWorkspaceContext();
    const { breadcrumbs } = context.metadata;

    const boardContext = useWorkspaceBoardContext();
    const { categories, date, isDateToday } = boardContext.metadata;

    const BoardElement = useMemo(() => {
        return () => <HeuteLink href="/workspace/board" linkType="internal" sx={{ color: "text.primary", textDecoration: "none" }}>board</HeuteLink>;
    }, []);

    const CategoriesElement = useMemo(() => {
        return () => <WorkspaceBoardCategoriesBreadcrumb categories={categories} />;
    }, [categories]);
    
    const DateElement = useMemo(() => {
        return () => <WorkspaceBoardDateBreadcrumb date={date!} isDateToday={isDateToday} />;
    }, [date, isDateToday]);

    //
    
    useEffect(() => {
        const items : HeuteAnimatedBreadcrumbsItem[] = [
            {
                name: "board",
                href: "/workspace/board",
                render: BoardElement
            },
            {
                name: "categories",
                render: CategoriesElement,
                animate: categories.length == 0
            }
        ];

        if(categories.length > 0) {
            items.push({
                name: "date",
                render: DateElement
            });
        }

        breadcrumbs.setItems(items);
    }, [categories, date]);
}