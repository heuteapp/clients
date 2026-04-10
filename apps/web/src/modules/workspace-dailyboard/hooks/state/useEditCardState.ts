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
    
    const hammerRef = useRef<HammerManager | null>(null);

    useEffect(() => {
        if(!Hammer) return;

        console.log(state.value);

        if(!hammerRef.current) {
            hammerRef.current = new Hammer(document.body);
            const tapRecognizer = hammerRef.current.get('tap');
            const panRecognizer = hammerRef.current.get('pan');

            const focusTap = new Hammer.Tap({ event: 'focustap', taps: 2, interval: 300 });
            focusTap.recognizeWith(tapRecognizer);

            const movePan = new Hammer.Pan({ event: 'movepan', threshold: 10, pointers: 0 });
            movePan.recognizeWith(panRecognizer);

            movePan.requireFailure(focusTap);

            hammerRef.current.add([focusTap, movePan]);
        }

        checkEditingState();
    }, [state, Hammer]);

    const checkEditingState = () => {

        const entryEditingState = () => {
            removeFocusListener();

            addOutsideClickListener();
            initListener.current = false;

            const card = currentCard.current;
            if(card) {
                card.classList.add("editing");
            }
        }

        const exitEditingState = () => {
            addFocusListener();

            removeOutsideClickListener();
            initListener.current = true;


            const card = currentCard.current!;

            if(card) {
                card.classList.remove("editing");
                currentCard.current = null;
            }
        }

        const handleFocusTap = (e: any) => {
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

        const addFocusListener = () => {
            hammerRef.current?.on("focustap", handleFocusTap);
        };

        const addOutsideClickListener = () => {
            document.addEventListener("pointerdown", handleOutsideClick);
        };

        const removeFocusListener = () => {
            hammerRef.current?.off("focustap", handleFocusTap);
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