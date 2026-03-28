import { useContext } from "react";
import { DailyboardContext } from "@/src/modules/ui-dailyboard/contexts/dailyboard.context";

export const useDailyboardContext = () => {
    const context = useContext(DailyboardContext);
    
    if (!context) {
        throw new Error("useDailyboardContext must be used within an DailyboardProvider");
    }

    return context;
};