import { PathSegmentsResult } from "../../ui-shared/types/path-segments.types";

export type WorkspaceMetadata = {
    type: WorkspaceType;
    segmentsResult: PathSegmentsResult;
}

export type WorkspaceType = "root" | "board" | "unknown";