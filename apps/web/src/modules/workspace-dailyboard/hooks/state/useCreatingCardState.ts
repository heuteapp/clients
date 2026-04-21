import { useEffect } from "react";
import { isCreatingPlacingCard } from "../../state/workspace-dailyboard.machine";
import { useWorkspaceDailyboardContext } from "../useWorkspaceDailyboardContext";
import { useDailyboardCardDragPlacement } from "../../../tools-dailyboard/hooks/useDailyboardCardDragPlacement";

export const useCreatingCardState = () => {
    const { metadata } = useWorkspaceDailyboardContext();
    const { categoryPath, date } = metadata;

    const { send, state } = useWorkspaceDailyboardContext();
    const { dragCard } = useDailyboardCardDragPlacement();
    
    useEffect(() => {
        if(isCreatingPlacingCard(state)) {
            const cardSize = state.context.draftCard?.size || { colSpan: 4, rowSpan: 3 };
            
            dragCard({ cardSize }, (result) => {
                if(result.success && result.placement) {
                    send({ type: 'CARD_CREATE_PLACE_DONE', payload: { categoryPath, date: date!, placement: result.placement } });
                }
                else {
                    send({ type: 'CARD_CREATE_PLACE_CANCEL' });
                }
            });
        }
    }, [state, dragCard]);
}