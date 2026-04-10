"use client";

import { useEffect, useRef, useState } from "react";
import { isEditingCard } from "../../state/workspace-dailyboard.machine";
import { useWorkspaceDailyboardContext } from "../useWorkspaceDailyboardContext";
import { useLayoutContext } from "@/src/modules/ui-layout/hooks/useLayoutContext";
import { findDailyboardCardAtCursor, getDailyboardCardData } from "@/src/modules/ui-dailyboard/utils/dom.utils";

export const useEditCardState = () => {
    const { Hammer } = useHammerLoader();

    const { send, state } = useWorkspaceDailyboardContext();
    const { metrics } = useLayoutContext();

    const initListener = useRef(false);
    const currentCard = useRef<HTMLElement | null>(null);
    
    const editRequestHammer = useRef<HammerManager | null>(null);

    useEffect(() => {
        console.log(state.value);
        checkEditingState();
    }, [state, Hammer]);

    const checkEditingState = () => {
        if(!Hammer) return;

        const entryEditingState = () => {
            removeEditRequestListener();
            addOutsideClickListener();
            initListener.current = false;
            editRequestHammer.current = new Hammer(document.body);

            const card = currentCard.current;
            if(card) {
                card.classList.add("editing");
            }
        }

        const exitEditingState = () => {
            addEditRequestListener();
            removeOutsideClickListener();
            initListener.current = true;

            editRequestHammer.current?.destroy();
            editRequestHammer.current = null;
            
            const card = currentCard.current!;

            if(card) {
                card.classList.remove("editing");
                currentCard.current = null;
            }
        }

        const handleEditRequest = (e: any) => {
            const { center } = e;
            
            const card = findDailyboardCardAtCursor(center.x, center.y);

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
                send({ type: "CARD_EDIT_CANCELLED" });
            }
        }

        const addEditRequestListener = () => {
            if(editRequestHammer.current) {            
                editRequestHammer.current.on("doubletap", handleEditRequest);
            }
        };

        const addOutsideClickListener = () => {
            document.addEventListener("pointerdown", handleOutsideClick);
        };

        const removeEditRequestListener = () => {
            if (editRequestHammer.current) {
                editRequestHammer.current.off("doubletap", handleEditRequest);
            }
        };

        const removeOutsideClickListener = () => {
            document.removeEventListener("pointerdown", handleOutsideClick);
        };
        
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

export function useHammerLoader() {
  const [Hammer, setHammer] = useState<HammerStatic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    import("hammerjs")
      .then((module) => {
        setHammer(() => module.default);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { Hammer, loading, error };
}