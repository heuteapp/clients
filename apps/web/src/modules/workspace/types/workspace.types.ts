import React from "react";
import { PathSegmentsResult } from "@/src/modules/ui-shared/types/path-segments.types";
import { BreadcrumbsItem } from "@/src/modules/ui-base/types/breadcrumbs.types";

export type WorkspaceMetadata = {
    type: WorkspaceType;
    segmentsResult: PathSegmentsResult;
    breadcrumbs: WorkspaceBreadcrumbs;
}

export type WorkspaceType = "root" | "board" | "unknown";

export type WorkspaceBreadcrumbs = {
    readonly items: BreadcrumbsItem[];
    setItems: React.Dispatch<React.SetStateAction<BreadcrumbsItem[]>>;
}