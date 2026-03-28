import { WorkspaceBoard, WorkspaceBoardCategory, WorkspaceBreadcrumbs, WorkspaceMetadata } from "./workspace.types";

export interface WorkspaceContextValue {
    metadata: WorkspaceMetadata;
    breadcrumbs: WorkspaceBreadcrumbs;
    boardCache: WorkspaceBoardCache;
}

//

export type WorkspaceBoardCache = {
    boards: WorkspaceBoard[];
    categories: WorkspaceBoardCategory[];
}