import { WorkspaceBoard, WorkspaceCategory, WorkspaceBreadcrumbs, WorkspaceMetadata } from "./workspace.types";

export interface WorkspaceContextValue {
    metadata: WorkspaceMetadata;
    breadcrumbs: WorkspaceBreadcrumbs;
    cache: WorkspaceCache;
}

//

export type WorkspaceCache = {
    boards: WorkspaceBoard[];
    categories: WorkspaceCategory[];
}