import { WorkspaceMetadata } from "@/src/modules/workspace/types/workspace.types";
import { useWorkspaceType } from "./useWorkspaceType";
import { useWorkspaceSegments } from "./useWorkspaceSegments";
import { useWorkspaceBreadcrumbs } from "./useWorspaceBreadcrumbs";

export const useWorkspace = () : WorkspaceMetadata => {
    const type = useWorkspaceType();
    const segmentsResult = useWorkspaceSegments();
    const breadcrumbs = useWorkspaceBreadcrumbs();

    return {
        type,
        segmentsResult,
        breadcrumbs
    }
}