import { useEffect } from "react";
import { isCreatingCard } from "../../state/workspace-dailyboard.machine";
import { useWorkspaceDailyboardContext } from "../useWorkspaceDailyboardContext";
import { useDailyboardCardDragPlacement } from "../../../tools-dailyboard/hooks/useDailyboardCardDragPlacement";

export const useCreateCardState = () => {
    const { metadata } = useWorkspaceDailyboardContext();
    const { categoryPath, date } = metadata;

    const { send, state } = useWorkspaceDailyboardContext();
    const { dragCard } = useDailyboardCardDragPlacement();
    
    useEffect(() => {
        if(isCreatingCard(state)) {
            const cardSize = state.context.sessions.cardCreate?.size || { colSpan: 4, rowSpan: 3 };
            
            dragCard({ cardSize }, (result) => {
                if(result.success && result.placement) {
                    send({ type: 'CARD_CREATE_SUCCEEDED', categoryPath, date: date!, placement: result.placement });
                }
                else {
                    send({ type: 'CARD_CREATE_CANCELLED' });
                }
            });
        }
    }, [state, dragCard]);
}