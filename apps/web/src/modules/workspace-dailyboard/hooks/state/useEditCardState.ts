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
            const pressRecognizer = hammerRef.current.get('press');
            const panRecognizer = hammerRef.current.get('pan');

            const focusTap = new Hammer.Tap({ event: 'focustap', taps: 1, interval: 300 });
            focusTap.recognizeWith(tapRecognizer);

            const focusPress = new Hammer.Press({ event: 'focuspress', time: 500 });
            focusPress.recognizeWith(pressRecognizer);

            const focusPan = new Hammer.Pan({ event: 'focuspan', threshold: 10, pointers: 0 });
            focusPan.recognizeWith(panRecognizer);

            hammerRef.current.add([focusTap, focusPress, focusPan]);
        }

        checkEditingState();
    }, [state, Hammer]);

    const checkEditingState = () => {

        const entryEditingState = () => {
            addEditListener();
            removeFocusListener();

            initListener.current = false;

            const card = currentCard.current;
            if(card) {
                card.classList.add("editing");
            }
        }

        const exitEditingState = () => {
            addFocusListener();
            removeEditListener();

            initListener.current = true;

            const card = currentCard.current!;

            if(card) {
                card.classList.remove("editing");
                currentCard.current = null;
            }
        }

        //

        const handleFocus = (e: any) => {
            const { center } = e;

            const card = findDailyboardCardAtCursor(center.x, center.y);

            if(card) {
                currentCard.current = card;
                
                const data = getDailyboardCardData(card);
                send({ type: "CARD_EDIT_REQUESTED", cardKey: data.key })
            }
        }

        //

        const handleFocusTap = (e: any) => {
            console.log("Focus tap detected");
        }

        const handleFocusPress = (e: any) => {
            console.log("Focus press detected");
        }

        const handleFocusPan = (e: any) => {
            console.log("Focus pan detected");
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
            hammerRef.current?.on("focuspress", handleFocusPress);
            hammerRef.current?.on("focuspan", handleFocusPan);
        };

        const addEditListener = () => {
            document.addEventListener("pointerdown", handleOutsideClick);
        };

        const removeFocusListener = () => {
            hammerRef.current?.off("focustap", handleFocusTap);
            hammerRef.current?.off("focuspress", handleFocusPress);
            hammerRef.current?.off("focuspan", handleFocusPan);
        };

        const removeEditListener = () => {
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