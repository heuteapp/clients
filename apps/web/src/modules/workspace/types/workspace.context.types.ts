import { WorkspaceBoard, WorkspaceBoardCategory, WorkspaceMetadata } from "./workspace.types";

export interface WorkspaceContextValue {
    metadata: WorkspaceMetadata;
    boardCache: WorkspaceBoardCache;
}

//

export type WorkspaceBoardCache = {
    boards: WorkspaceBoard[];
    categories: WorkspaceBoardCategory[];
}