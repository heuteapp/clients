import { useEffect } from "react";
import { isCreatingCard } from "../../state/workspace-dailyboard.machine";
import { useWorkspaceDailyboardContext } from "../useWorkspaceDailyboardContext";

export const useCreateCardState = () => {
    const { state } = useWorkspaceDailyboardContext();
    
    useEffect(() => {
        if(isCreatingCard(state)) {
            const handleMouseMove = (event: MouseEvent) => {
                console.log("Mouse moving...", { x: event.clientX, y: event.clientY });
            };

            window.addEventListener("mousemove", handleMouseMove);

            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
            };
        }
    }, [state]);
}