import { useMemo } from "react"
import { WorkspaceDailyboardCache } from "../cache/WorkspaceDailyboardCache";
import { WorkspaceCategoryCache } from "../cache/WorkspaceCategoryCache";
import { WorkspaceCache } from "../types/workspace.context.types";

export const useWorkspaceCache = () : WorkspaceCache => {
    const cache = useMemo(() => ({
        dailyboards: new WorkspaceDailyboardCache(),
        categories: new WorkspaceCategoryCache()
    }), []);
    
    return cache;
}