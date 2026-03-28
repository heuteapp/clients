import { useContext } from "react";
import { WorkspaceDailyboardContext } from "../contexts/workspace-dailyboard.context";

export const useWorkspaceDailyboardContext = () => {
    const context = useContext(WorkspaceDailyboardContext);
    
    if (!context) {
        throw new Error("useWorkspaceDailyboardContext must be used within an WorkspaceDailyboardProvider");
    }

    return context;
};