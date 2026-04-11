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

    const focusTapCard = useRef<HTMLElement | null>(null);
    const focusTapResetTimeout = useRef<NodeJS.Timeout | null>(null);

    const focusPanPosRequest = useRef<boolean>(false);

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

            const focusPress = new Hammer.Press({ event: 'focuspress', time: 200 });
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

            if(focusPanPosRequest.current) {
                send({ type: "CARD_EDIT_POS_REQUESTED" });
                focusPanPosRequest.current = false;
            }
        }

        const exitEditingState = () => {
            addFocusListener();
            removeEditListener();

            initListener.current = true;

            const card = currentCard.current!;
            focusTapCard.current = null;

            if(card) {
                card.classList.remove("editing");
                currentCard.current = null;
            }
        }

        //

        const sendEditRequest = (card: HTMLElement) => {
            currentCard.current = card;
            
            const data = getDailyboardCardData(card);
            send({ type: "CARD_EDIT_REQUESTED", cardKey: data.key })
        }

        const sendEditMoveRequest = (card: HTMLElement) => {
            sendEditRequest(card);
            focusPanPosRequest.current = true;
        }

        //

        const handleFocusTap = (e: any) => {
            const { center } = e;

            const card = findDailyboardCardAtCursor(center.x, center.y);

            if(card) {
                if(!focusTapCard.current) {
                    focusTapCard.current = card;

                    focusTapResetTimeout.current = setTimeout(() => {
                        focusTapCard.current = null;
                        console.log("Focus tap reset");
                    }, 300);
                }
                else {
                    if(focusTapCard.current === card) {
                        console.log("Focus tap detected on card", card);
                        clearTimeout(focusTapResetTimeout.current!);

                        sendEditRequest(card);
                    }
                }
            }
        }

        const handleFocusPress = (e: any) => {
            if(focusTapCard.current) {
                clearTimeout(focusTapResetTimeout.current!);

                sendEditRequest(focusTapCard.current);
            }
        }

        const handleFocusPan = (e: any) => {
            if(focusTapCard.current) {
                console.log("Focus pan detected, cancelling focus tap");
                clearTimeout(focusTapResetTimeout.current!);

                sendEditMoveRequest(focusTapCard.current);
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