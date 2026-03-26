import { WorkspaceMetadata } from "@/src/modules/workspace/types/workspace.types";
import { useWorkspaceType } from "./useWorkspaceType";

export const useWorkspace = () : WorkspaceMetadata => {
    const type = useWorkspaceType();

    return {
        type,
    }
}