import { BreadcrumbsItem } from "@/src/modules/ui-base/types/breadcrumbs.types";
import { WorkspaceDailyboard, WorkspaceCategory, WorkspaceMetadata } from "./workspace.types";

export interface WorkspaceContextValue {
    metadata: WorkspaceMetadata;
    breadcrumbs: WorkspaceBreadcrumbs;
    cache: WorkspaceCache;
}

//

export type WorkspaceBreadcrumbs = {
    readonly items: BreadcrumbsItem[];
    setItems: React.Dispatch<React.SetStateAction<BreadcrumbsItem[]>>;

    readonly animate: boolean;
    setAnimate: React.Dispatch<React.SetStateAction<boolean>>;
}

export type WorkspaceCache = {
    dailyboards: Map<string, WorkspaceDailyboard>;
    categories: WorkspaceCategory[];
}