import { useEffect, useRef } from "react";
import { isEditingCard } from "../../state/workspace-dailyboard.machine";
import { useWorkspaceDailyboardContext } from "../useWorkspaceDailyboardContext";
import { useLayoutContext } from "@/src/modules/ui-layout/hooks/useLayoutContext";
import { findDailyboardCardAtCursor, getDailyboardCardData } from "@/src/modules/ui-dailyboard/utils/dom.utils";

export const useEditCardState = () => {
    const { send, state } = useWorkspaceDailyboardContext();
    const { metrics } = useLayoutContext();

    const initListener = useRef(false);

    useEffect(() => {
        console.log(state.value);
        if (isEditingCard(state)) {
            if(initListener.current) {
                removeEditRequestListener();
                initListener.current = false;
            }
        }
        else {
            if(!initListener.current) {
                addEditRequestListener();
                initListener.current = true;
            }
        }
    }, [state]);

    const handleEditRequest = (event: MouseEvent) => {
        const card = findDailyboardCardAtCursor(event.clientX, event.clientY);

        if(card) {
            const data = getDailyboardCardData(card);
            send({ type: "CARD_EDIT_REQUESTED", cardKey: data.key })
        }
    }

    const addEditRequestListener = () => {
        document.addEventListener("dblclick", handleEditRequest);
    };

    const removeEditRequestListener = () => {
        document.removeEventListener("dblclick", handleEditRequest);
    };
}