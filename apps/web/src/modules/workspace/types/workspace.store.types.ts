import { WorkspaceDailyboardMap, WorkspaceCategoryMap } from "./workspace.types";

export interface WorkspaceStore {
    dailyboards: WorkspaceDailyboardMap
    categories: WorkspaceCategoryMap;
}