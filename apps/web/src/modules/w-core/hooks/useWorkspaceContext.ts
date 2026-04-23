import { useContext } from "react";
import { WorkspaceContext } from "@/src/modules/w-core/contexts/workspace.context";

export const useWorkspaceContext = () => {
    const context = useContext(WorkspaceContext);
    
    if (!context) {
        throw new Error("useWorkspaceContext must be used within an WorkspaceProvider");
    }

    return context;
};