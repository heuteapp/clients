import { BreadcrumbsItem } from "@/src/modules/ui-base/types/breadcrumbs.types";
import { WorkspaceDailyboard, WorkspaceCategory, WorkspaceMetadata } from "./workspace.types";
import { WorkspaceDailyboardCache } from "../cache/WorkspaceDailyboardCache";
import { WorkspaceCategoryCache } from "../cache/WorkspaceCategoryCache";

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
    dailyboards: WorkspaceDailyboardCache;
    categories: WorkspaceCategoryCache;
}

//

export type WorkspaceDailyboardsMap = Map<string, Map<string, WorkspaceDailyboard>>;

export type WorkspaceCategoriesMap = Map<string, WorkspaceCategory>;

export type WorkspaceCategoryIndex = Map<string, Set<string>>;