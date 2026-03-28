import React from "react";
import { PathSegmentsResult } from "@/src/modules/ui-shared/types/path-segments.types";
import { BreadcrumbsItem } from "@/src/modules/ui-base/types/breadcrumbs.types";
import { YYMMDDDate } from "../../shared/types/date.types";

export type WorkspaceMetadata = {
    type: WorkspaceType;
    segmentsResult: PathSegmentsResult;
}

export type WorkspaceType = "root" | "board" | "unknown";

export type WorkspaceBreadcrumbs = {
    readonly items: BreadcrumbsItem[];
    setItems: React.Dispatch<React.SetStateAction<BreadcrumbsItem[]>>;

    readonly animate: boolean;
    setAnimate: React.Dispatch<React.SetStateAction<boolean>>;
}

//

export type WorkspaceBoard = {
    date: YYMMDDDate;
}

export type WorkspaceCategory = {
    name: string;
    children?: WorkspaceCategory[];
}