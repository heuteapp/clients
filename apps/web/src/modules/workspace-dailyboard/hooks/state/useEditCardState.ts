"use client";

import { useEffect, useRef, useCallback } from "react";
import { isPlacingCard, isPlacingCardIdle, isPlacingCardMoving } from "../../state/workspace-dailyboard.machine";
import { useWorkspaceDailyboardContext } from "../useWorkspaceDailyboardContext";
import { findDailyboardCardAtCursor, getDailyboardCardData } from "@/src/modules/ui-dailyboard/utils/dom.utils";
import { useHammerLoader } from "@/src/modules/ui-shared/hooks/useHammerLoader";
import { useDailyboardCardDragPlacement } from "../../../tools-dailyboard/hooks/useDailyboardCardDragPlacement";

export const useEditCardState = () => {
    const { Hammer } = useHammerLoader();
    const { send, state } = useWorkspaceDailyboardContext();
    const { dragCard } = useDailyboardCardDragPlacement();
    const { metadata } = useWorkspaceDailyboardContext();
    const { categoryPath, date } = metadata;

    const stateRef = useRef(state);
    const categoryPathRef = useRef(categoryPath);
    const dateRef = useRef(date);
    const sendRef = useRef(send);
    const dragCardRef = useRef(dragCard);

    useEffect(() => {
        stateRef.current = state;
        categoryPathRef.current = categoryPath;
        dateRef.current = date;
        sendRef.current = send;
        dragCardRef.current = dragCard;
    }, [state, categoryPath, date, send, dragCard]);

    const hammerRef = useRef<HammerManager | null>(null);
    const currentCard = useRef<HTMLElement | null>(null);
    const focusTapCard = useRef<HTMLElement | null>(null);
    const focusTapResetTimeout = useRef<NodeJS.Timeout | null>(null);
    const isMounted = useRef(true);

    const initFocusState = useRef(false);
    const initEditingState = useRef(false);
    const initEditingPosState = useRef(false);

    // ---------- Helper Functions ----------
    const sendEditRequest = useCallback((card: HTMLElement) => {
        currentCard.current = card;

        const data = getDailyboardCardData(card);
        sendRef.current({
            type: "CARD_PLACE_REQUESTED",
            categoryPath: categoryPathRef.current,
            date: dateRef.current!,
            cardKey: data.key,
        });
    }, []);

    const sendEditMoveRequest = useCallback((card: HTMLElement) => {
        sendEditRequest(card);
    }, [sendEditRequest]);

    const sendEditCancel = useCallback(() => {
        sendRef.current({ type: "CARD_PLACE_CANCELLED" });
    }, []);

    // ---------- Event Handlers ----------
    const handleFocusTap = useCallback((e: HammerInput) => {
        const { center } = e;
        const card = findDailyboardCardAtCursor(center.x, center.y);
        if (!card) return;

        if (focusTapCard.current) {
            if (focusTapCard.current === card) {
                if (focusTapResetTimeout.current) clearTimeout(focusTapResetTimeout.current);
            }
        } else {
            focusTapCard.current = card;
            focusTapResetTimeout.current = setTimeout(() => {
                if (isMounted.current) focusTapCard.current = null;
            }, 300);
        }
    }, [sendEditRequest]);

    const handleFocusPress = useCallback(() => {
        if (focusTapCard.current) {
            if (focusTapResetTimeout.current) clearTimeout(focusTapResetTimeout.current);
            sendEditRequest(focusTapCard.current);
        }
    }, [sendEditRequest]);

    const handleFocusPan = useCallback(() => {
        if (focusTapCard.current) {
            if (focusTapResetTimeout.current) clearTimeout(focusTapResetTimeout.current);
            sendEditMoveRequest(focusTapCard.current);
        }
    }, [sendEditMoveRequest]);

    const handleEditingPointerDown = useCallback((event: PointerEvent) => {
        if (!currentCard.current) return;

        const { clientX, clientY } = event;
        const clickedCard = findDailyboardCardAtCursor(clientX, clientY);

        if (clickedCard !== currentCard.current) {
            sendEditCancel();
        }
    }, [sendEditCancel]);

    const handleEditingPosPan = useCallback(() => {
        if(isPlacingCardIdle(stateRef.current)) {
            sendRef.current({ type: "CARD_PLACE_REPOSITION_REQUESTED" });
        }
    }, []);

    const handleEditingPosPanEnd = useCallback(() => {
        sendEditCancel();
    }, [sendEditCancel]);

    // ---------- State Entry/Exit ----------
    const entryFocusState = useCallback(() => {
        if (!hammerRef.current) return;

        hammerRef.current.on("focustap", handleFocusTap);
        hammerRef.current.on("focuspress", handleFocusPress);
        hammerRef.current.on("focuspan", handleFocusPan);
        initFocusState.current = true;

    }, [handleFocusTap, handleFocusPress, handleFocusPan]);

    const exitFocusState = useCallback(() => {
        if (!hammerRef.current) return;

        hammerRef.current.off("focustap", handleFocusTap);
        hammerRef.current.off("focuspress", handleFocusPress);
        hammerRef.current.off("focuspan", handleFocusPan);

        if (focusTapResetTimeout.current) {
            clearTimeout(focusTapResetTimeout.current);
            focusTapResetTimeout.current = null;
        }

        focusTapCard.current = null;
        initFocusState.current = false;
    }, [handleFocusTap, handleFocusPress, handleFocusPan]);

    const entryEditingState = useCallback(() => {  
        if (!hammerRef.current) return;
      
        hammerRef.current.on("editingpospan", handleEditingPosPan);
        document.addEventListener("pointerdown", handleEditingPointerDown);
        const card = currentCard.current;

        if (card) card.classList.add("editing");

        initEditingState.current = true;
    }, [handleEditingPointerDown]);

    const exitEditingState = useCallback(() => {
        if (!hammerRef.current) return;

        hammerRef.current.off("editingpospan", handleEditingPosPan);
        document.removeEventListener("pointerdown", handleEditingPointerDown);
        const card = currentCard.current;

        if (card) {
            card.classList.remove("editing");
            currentCard.current = null;
        }

        initEditingState.current = false;
    }, [handleEditingPointerDown]);

    const entryEditingPosState = useCallback(() => {
        if (!hammerRef.current) return;

        hammerRef.current.on("editingpospanend", handleEditingPosPanEnd);
        const card = currentCard.current;

        if (!card) return;

        const { colSpan, rowSpan, key } = getDailyboardCardData(card);
        let isActive = true;

        dragCardRef.current({ cardSize: { colSpan, rowSpan }, targetCardKey: key }, (result) => {
            if (!isActive || !isMounted.current) return;
            if (result.success && result.placement) {
                sendRef.current({ type: "CARD_PLACE_REPOSITION_COMPLETED", placement: result.placement });
            }
        });
        console.log("Entering editing position state", card);

        card.classList.add("moving");
        initEditingPosState.current = true;

        return () => { 
            isActive = false; 
        };
    }, [handleEditingPosPanEnd]);

    const exitEditingPosState = useCallback(() => {
        if (!hammerRef.current) return;

        hammerRef.current.off("editingpospanend", handleEditingPosPanEnd);
        const card = currentCard.current;

        console.log("Exiting editing position state", card);
        
        if (card) card.classList.remove("moving");
        initEditingPosState.current = false;
    }, [handleEditingPosPanEnd]);

    // ---------- Hammer Setup ----------
    useEffect(() => {
        if (!Hammer) return;
        if (!hammerRef.current) {
            const hammer = new Hammer(document.body);
            const tapRecognizer = hammer.get("tap");
            const pressRecognizer = hammer.get("press");
            const panRecognizer = hammer.get("pan");

            const focusTap = new Hammer.Tap({ event: "focustap", taps: 1, interval: 300 });
            focusTap.recognizeWith(tapRecognizer);

            const focusPress = new Hammer.Press({ event: "focuspress", time: 200 });
            focusPress.recognizeWith(pressRecognizer);

            const focusPan = new Hammer.Pan({ event: "focuspan", threshold: 10, pointers: 0 });
            focusPan.recognizeWith(panRecognizer);
            
            const editingPosPan = new Hammer.Pan({ event: "editingpospan", threshold: 15, pointers: 0 });
            editingPosPan.recognizeWith([panRecognizer, focusPan]);

            hammer.add(focusTap);
            hammer.add(focusPress);
            hammer.add(focusPan);
            hammer.add(editingPosPan);
            hammerRef.current = hammer;
        }
        return () => {
            isMounted.current = false;
            if (hammerRef.current) {
                hammerRef.current.destroy();
                hammerRef.current = null;
            }

            if (focusTapResetTimeout.current) clearTimeout(focusTapResetTimeout.current);
            document.removeEventListener("pointerdown", handleEditingPointerDown);
        };
    }, [Hammer, handleEditingPointerDown]);

    useEffect(() => {
        if (!hammerRef.current) return;

        if (isPlacingCard(stateRef.current)) {
            if (initFocusState.current) exitFocusState();
            
            if (isPlacingCardMoving(stateRef.current) && !initEditingPosState.current) {
                entryEditingPosState();
            } else if (!isPlacingCardMoving(stateRef.current) && initEditingPosState.current) {
                exitEditingPosState();
            }
            if (!initEditingState.current) {
                entryEditingState();
            }
        } else {
            if (!initFocusState.current) entryFocusState();
            if (initEditingPosState.current) exitEditingPosState();
            if (initEditingState.current) exitEditingState();
        }
    }, [state, entryFocusState, exitFocusState, entryEditingState, exitEditingState, entryEditingPosState, exitEditingPosState]);
};