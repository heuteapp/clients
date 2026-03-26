import { useContext } from "react";
import { WorkspaceBoardContext } from "../contexts/workspace-board.context";

export const useWorkspaceBoardContext = () => {
    const context = useContext(WorkspaceBoardContext);
    
    if (!context) {
        throw new Error("useWorkspaceBoardContext must be used within an WorkspaceBoardProvider");
    }

    return context;
};