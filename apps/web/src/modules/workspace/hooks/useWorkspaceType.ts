import { usePathSegments } from "../../ui-shared/hooks/usePathSegments";
import { WorkspaceType } from "../types/workspace.types";

export const useWorkspaceType = (): WorkspaceType => {
    const { segments, isRoot } = usePathSegments({ startsWith: '/workspace' });
    
    if (isRoot) {
        return 'root';
    }

    const workspaceType = segments[0];
    
    switch (workspaceType) {
        case 'board':
            return 'board';
        default:
            return 'unknown';
    }
};