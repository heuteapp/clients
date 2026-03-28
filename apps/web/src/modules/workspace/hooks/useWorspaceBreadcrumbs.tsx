import React from "react";
import { BreadcrumbsAnimate, BreadcrumbsItem } from "@/src/modules/ui-base/types/breadcrumbs.types";
import { WorkspaceBreadcrumbs } from "@/src/modules/workspace/types/workspace.types";

export const useWorkspaceBreadcrumbs = () : WorkspaceBreadcrumbs => {
    const [items, setItems] = React.useState<BreadcrumbsItem[]>([]);
    const [animate, setAnimate] = React.useState<BreadcrumbsAnimate>(true);

    return { items, setItems, animate, setAnimate };
}