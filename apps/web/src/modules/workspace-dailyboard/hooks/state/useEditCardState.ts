import { useEffect, useRef } from "react";
import { isEditingCard } from "../../state/workspace-dailyboard.machine";
import { useWorkspaceDailyboardContext } from "../useWorkspaceDailyboardContext";
import { useLayoutContext } from "@/src/modules/ui-layout/hooks/useLayoutContext";
import { findDailyboardCardAtCursor, getDailyboardCardData } from "@/src/modules/ui-dailyboard/utils/dom.utils";

export const useEditCardState = () => {
    const { send, state } = useWorkspaceDailyboardContext();
    const { metrics } = useLayoutContext();

    const initListener = useRef(false);
    const currentCard = useRef<HTMLElement | null>(null);

    useEffect(() => {
        console.log(state.value);
        checkEditingState();
    }, [state]);

    const checkEditingState = () => {
        const entryEditingState = () => {
            removeEditRequestListener();
            addOutsideClickListener();
            initListener.current = false;
        }

        const exitEditingState = () => {
            addEditRequestListener();
            removeOutsideClickListener();
            initListener.current = true;
            currentCard.current = null;
        }

        const handleEditRequest = (event: MouseEvent) => {
            const { clientX, clientY } = event;
            
            const card = findDailyboardCardAtCursor(clientX, clientY);

            if(card) {
                currentCard.current = card;
                
                const data = getDailyboardCardData(card);
                send({ type: "CARD_EDIT_REQUESTED", cardKey: data.key })
            }
        }

        const handleOutsideClick = (event: PointerEvent) => {
            if (!currentCard.current) return;
            
            const { clientX, clientY } = event;
            
            const clickedCard = findDailyboardCardAtCursor(clientX, clientY);
            
            if (clickedCard !== currentCard.current) {
                currentCard.current = null;
                send({ type: "CARD_EDIT_CANCELLED" });
            }
        }

        const addEditRequestListener = () => {
            document.addEventListener("dblclick", handleEditRequest);
        };

        const addOutsideClickListener = () => {
            document.addEventListener("pointerdown", handleOutsideClick);
        };

        const removeEditRequestListener = () => {
            document.removeEventListener("dblclick", handleEditRequest);
        };

        const removeOutsideClickListener = () => {
            document.removeEventListener("pointerdown", handleOutsideClick);
        };
        
        //


        if (isEditingCard(state)) {
            if(initListener.current) {
                entryEditingState();
            }
        }
        else {
            if(!initListener.current) {
                exitEditingState();
            }
        }
    }
}