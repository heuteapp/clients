import { WorkspaceMetadata } from "@/src/modules/workspace/types/workspace.types";
import { useWorkspaceType } from "./useWorkspaceType";
import { useWorkspaceSegments } from "./useWorkspaceSegments";

export const useWorkspaceMetadata = () : WorkspaceMetadata => {
    const type = useWorkspaceType();
    const segmentsResult = useWorkspaceSegments();

    return {
        type,
        segmentsResult,
    }
}