import { PathSegmentsResult } from "@/src/modules/ui-shared/types/path-segments.types";
import { YYMMDDDate } from "../../shared/types/date.types";

export type WorkspaceMetadata = {
    type: WorkspaceType;
    segmentsResult: PathSegmentsResult;
}

export type WorkspaceType = "root" | "dailyboard" | "unknown";

//

export type WorkspaceDailyboardRef = {
    date: YYMMDDDate;
}

export type WorkspaceCategoryRef = {
    name: string;
}

export type WorkspaceDailyboardMap = Map<string, Map<string, WorkspaceDailyboardRef>>;

export type WorkspaceCategoryMap = Map<string, WorkspaceCategoryRef>;

export type WorkspaceCategoryIndex = Map<string, Set<string>>;