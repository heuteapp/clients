import { useEffect, useRef } from "react";
import { isEditingCard } from "../../state/workspace-dailyboard.machine";
import { useWorkspaceDailyboardContext } from "../useWorkspaceDailyboardContext";
import { useLayoutContext } from "@/src/modules/ui-layout/hooks/useLayoutContext";
import { findDailyboardCardAtCursor } from "@/src/modules/ui-dailyboard/utils/dom.utils";

export const useEditCardState = () => {
    const { send, state } = useWorkspaceDailyboardContext();
    const { metrics } = useLayoutContext();

    const initListener = useRef(false);

    useEffect(() => {
        if (isEditingCard(state)) {
            if(initListener.current) {
                removeListener();
                initListener.current = false;
            }
        }
        else {
            if(!initListener.current) {
                addListener();
                initListener.current = true;
            }
        }
    }, [state]);

    const handleCardEdit = (event: MouseEvent) => {
        const card = findDailyboardCardAtCursor(event.clientX, event.clientY);

        console.log("Card at cursor:", card);
    }

    const addListener = () => {
        document.addEventListener("dblclick", handleCardEdit);
    };

    const removeListener = () => {
        document.removeEventListener("dblclick", handleCardEdit);
    };
}