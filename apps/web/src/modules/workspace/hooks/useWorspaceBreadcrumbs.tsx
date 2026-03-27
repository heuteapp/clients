import React from "react";
import { BreadcrumbsItem } from "@/src/modules/ui-base/types/breadcrumbs.types";
import { WorkspaceBreadcrumbs } from "@/src/modules/workspace/types/workspace.types";

export const useWorkspaceBreadcrumbs = () : WorkspaceBreadcrumbs => {
    const [items, setItems] = React.useState<BreadcrumbsItem[]>([]);

    return { items, setItems };
}