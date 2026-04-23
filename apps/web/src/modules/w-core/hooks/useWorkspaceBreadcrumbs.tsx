import React from "react";
import { BreadcrumbsItem } from "@/src/modules/ui-base/types/breadcrumbs.types";
import { WorkspaceBreadcrumbs } from "@/src/modules/w-core/types/workspace.context.types";

export const useWorkspaceBreadcrumbs = () : WorkspaceBreadcrumbs => {
    const [items, setItems] = React.useState<BreadcrumbsItem[]>([]);
    const [animate, setAnimate] = React.useState<boolean>(true);

    return { items, setItems, animate, setAnimate };
}