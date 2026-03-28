import { WorkspaceDailyboard, WorkspaceCategory, WorkspaceBreadcrumbs, WorkspaceMetadata } from "./workspace.types";

export interface WorkspaceContextValue {
    metadata: WorkspaceMetadata;
    breadcrumbs: WorkspaceBreadcrumbs;
    cache: WorkspaceCache;
}

//

export type WorkspaceCache = {
    dailyboards: WorkspaceDailyboard[];
    categories: WorkspaceCategory[];
}