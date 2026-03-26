export type WorkspaceMetadata = {
    type: WorkspaceType;
}

export type WorkspaceType = "root" | "board" | "unknown";