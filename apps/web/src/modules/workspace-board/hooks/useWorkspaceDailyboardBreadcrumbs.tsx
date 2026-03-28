import { useEffect, useMemo } from "react";
import { useWorkspaceContext } from "@/src/modules/workspace/hooks/useWorkspaceContext";
import { WorkspaceDailyboardCategoriesBreadcrumb } from "../components/WorkspaceDailyboardCategoriesBreadcrumb";
import { WorkspaceDailyboardDateBreadcrumb } from "../components/WorkspaceDailyboardDateBreadcrumb";
import { useWorkspaceDailyboardContext } from "./useWorkspaceDailyboardContext";
import { HeuteLink } from "../../ui-shared/components/HeuteLink";
import { HeuteAnimatedBreadcrumbsItem } from "../../ui-shared/types/components/heute-breadcrumbs.types";

export const useWorkspaceDailyboardBreadcrumbs = () => {
    const { breadcrumbs } = useWorkspaceContext();

    const dailyboardContext = useWorkspaceDailyboardContext();
    const { categories, date, isDateToday } = dailyboardContext.metadata;

    const DailyboardElement = useMemo(() => {
        return () => <HeuteLink href="/workspace/dailyboard" linkType="internal" sx={{ color: "text.primary", textDecoration: "none" }}>dailyboard</HeuteLink>;
    }, []);

    const CategoriesElement = useMemo(() => {
        return () => <WorkspaceDailyboardCategoriesBreadcrumb categories={categories} />;
    }, [categories]);
    
    const DateElement = useMemo(() => {
        return () => <WorkspaceDailyboardDateBreadcrumb date={date!} isDateToday={isDateToday} />;
    }, [date, isDateToday]);

    //
    
    useEffect(() => {
        const items : HeuteAnimatedBreadcrumbsItem[] = [
            {
                name: "dailyboard",
                href: "/workspace/dailyboard",
                render: DailyboardElement
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