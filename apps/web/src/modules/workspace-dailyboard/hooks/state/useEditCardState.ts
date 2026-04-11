"use client";

import { useEffect, useRef, useState } from "react";
import { isEditingCard, isEditingCardMoving } from "../../state/workspace-dailyboard.machine";
import { useWorkspaceDailyboardContext } from "../useWorkspaceDailyboardContext";
import { useLayoutContext } from "@/src/modules/ui-layout/hooks/useLayoutContext";
import { findDailyboardCardAtCursor, getDailyboardCardData } from "@/src/modules/ui-dailyboard/utils/dom.utils";
import { useHammerLoader } from "@/src/modules/ui-shared/hooks/useHammerLoader";
import { useCardPlacementByDrag } from "../helpers/useGhostCard";

export const useEditCardState = () => {
    const { Hammer } = useHammerLoader();

    const { send, state } = useWorkspaceDailyboardContext();
    const { metrics } = useLayoutContext();

    const { drag: dragCard } = useCardPlacementByDrag();

    const initFocusState = useRef(false);
    const initEditingState = useRef(false);
    const initEditingPosState = useRef(false);

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

            const editingPosPan = new Hammer.Pan({ event: 'editingpospan', threshold: 15, pointers: 0 });
            editingPosPan.recognizeWith([panRecognizer, focusPan]);

            hammerRef.current.add(focusTap);
            hammerRef.current.add(focusPress);
            hammerRef.current.add(focusPan);
            hammerRef.current.add(editingPosPan);
        }

        checkEditingState();
    }, [state, Hammer]);

    const checkEditingState = () => {

        const entryFocusState = () => {
            addFocusListeners();

            initFocusState.current = true;
        }

        const entryEditingState = () => {
            addEditingListeners();

            const card = currentCard.current;
            if(card) {
                card.classList.add("editing");
            }

            if(focusPanPosRequest.current) {
                send({ type: "CARD_EDIT_POS_REQUESTED" });
                focusPanPosRequest.current = false;
            }

            initEditingState.current = true;
        }

        const entryEditingPosState = () => {
            addEditingPosListeners();

            const { colSpan, rowSpan } = getDailyboardCardData(currentCard.current!);

            dragCard({ colSpan, rowSpan }, (placement) => {
                console.log("Edit card moved, new placement:", placement);
            });

            const card = currentCard.current;
            if(card) {
                card.classList.add("moving");
            }

            initEditingPosState.current = true;
        }

        const exitFocusState = () => {
            removeFocusListeners();

            focusTapCard.current = null;

            if(focusTapResetTimeout.current) {
                clearTimeout(focusTapResetTimeout.current);
            }

            initFocusState.current = false;
        }

        const exitEditingState = () => {
            removeEditingListeners();

            const card = currentCard.current!;

            if(card) {
                card.classList.remove("editing");
                currentCard.current = null;
            }

            initEditingState.current = false;
        }

        const exitEditingPosState = () => {
            removeEditingPosListeners();

            const card = currentCard.current;

            if(card) {
                card.classList.remove("moving");
            }

            initEditingPosState.current = false;
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

        const sendEditCancel = () => {
            send({ type: "CARD_EDIT_CANCELLED" });
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
                    }, 300);
                }
                else {
                    if(focusTapCard.current === card) {
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

        const handleEditingPointerDown = (event: PointerEvent) => {
            if (!currentCard.current) return;
            
            const { clientX, clientY } = event;
            
            const clickedCard = findDailyboardCardAtCursor(clientX, clientY);
            
            if (clickedCard !== currentCard.current) {
                sendEditCancel();
            }
        }

        const handleEditingPosPan = (e: any) => {
            console.log("Editing pos pan detected, sending move request");
        }

        const handleEditingPosPanEnd = (e: any) => {
            sendEditCancel();
        }

        const addFocusListeners = () => {
            hammerRef.current?.on("focustap", handleFocusTap);
            hammerRef.current?.on("focuspress", handleFocusPress);
            hammerRef.current?.on("focuspan", handleFocusPan);
        };

        const addEditingListeners = () => {
            document.addEventListener("pointerdown", handleEditingPointerDown);
        };

        const addEditingPosListeners = () => {
            hammerRef.current?.on("editingpospan", handleEditingPosPan);
            hammerRef.current?.on("editingpospanend", handleEditingPosPanEnd);
        }

        const removeFocusListeners = () => {
            hammerRef.current?.off("focustap", handleFocusTap);
            hammerRef.current?.off("focuspress", handleFocusPress);
            hammerRef.current?.off("focuspan", handleFocusPan);
        };

        const removeEditingListeners = () => {
            document.removeEventListener("pointerdown", handleEditingPointerDown);
        };

        const removeEditingPosListeners = () => {
            hammerRef.current?.off("editingpospan", handleEditingPosPan);
            hammerRef.current?.off("editingpospanend", handleEditingPosPanEnd);
        }
        
        if (isEditingCard(state)) {
            if(initFocusState.current) {
                exitFocusState();
            }

            if(isEditingCardMoving(state) && !initEditingPosState.current) {
                entryEditingPosState();
            }

            if(!initEditingState.current) {
                entryEditingState();
            }
        }
        else {
            if(!initFocusState.current) {
                entryFocusState();
            }

            if(!isEditingCardMoving(state) && initEditingState.current) {
                exitEditingPosState();
            }

            if(initEditingState.current) {
                exitEditingState();
            }
        }
    }
}