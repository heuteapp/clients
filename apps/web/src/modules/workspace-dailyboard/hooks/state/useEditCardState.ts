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

    const hammerContext = useRef<{
        manager: HammerManager;
        focusTap: TapRecognizer | null;
        focusPress: PressRecognizer | null;
        focusPan: PanRecognizer | null;
        placingPan: PanRecognizer | null;
        placingMovePan: PanRecognizer | null;
    } | null>(null);

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

    const handlePlacingPointerDown = useCallback((event: PointerEvent) => {
        if (!currentCard.current) return;

        const { clientX, clientY } = event;
        const clickedCard = findDailyboardCardAtCursor(clientX, clientY);

        if (clickedCard !== currentCard.current) {
            sendEditCancel();
        }
    }, [sendEditCancel]);

    const handlePlacingPan = useCallback(() => {
        if(isPlacingCardIdle(stateRef.current)) {
            sendRef.current({ type: "CARD_PLACE_REPOSITION_REQUESTED" });
        }
    }, []);

    const handlePlacingPanEnd = useCallback(() => {
        sendEditCancel();
    }, [sendEditCancel]);

    // ---------- State Entry/Exit ----------
    const entryFocusState = useCallback(() => {
        if (!hammerContext.current) return;

        hammerContext.current.manager.on("focustap", handleFocusTap);
        hammerContext.current.manager.on("focuspress", handleFocusPress);
        hammerContext.current.manager.on("focuspan", handleFocusPan);
        initFocusState.current = true;

    }, [handleFocusTap, handleFocusPress, handleFocusPan]);

    const exitFocusState = useCallback(() => {
        if (!hammerContext.current) return;

        hammerContext.current.manager.off("focustap", handleFocusTap);
        hammerContext.current.manager.off("focuspress", handleFocusPress);
        hammerContext.current.manager.off("focuspan", handleFocusPan);

        if (focusTapResetTimeout.current) {
            clearTimeout(focusTapResetTimeout.current);
            focusTapResetTimeout.current = null;
        }

        focusTapCard.current = null;
        initFocusState.current = false;
    }, [handleFocusTap, handleFocusPress, handleFocusPan]);

    const entryPlacingState = useCallback(() => {  
        if (!hammerContext.current) return;
      
        hammerContext.current.manager.on("placingpan", handlePlacingPan);
        document.addEventListener("pointerdown", handlePlacingPointerDown);
        const card = currentCard.current;

        if (card) card.classList.add("editing");

        initEditingState.current = true;
    }, [handlePlacingPointerDown]);

    const exitPlacingState = useCallback(() => {
        if (!hammerContext.current) return;

        hammerContext.current.manager.off("placingpan", handlePlacingPan);
        document.removeEventListener("pointerdown", handlePlacingPointerDown);
        const card = currentCard.current;

        if (card) {
            card.classList.remove("editing");
            currentCard.current = null;
        }

        initEditingState.current = false;
    }, [handlePlacingPointerDown]);

    const entryEditingPosState = useCallback(() => {
        if (!hammerContext.current) return;

        hammerContext.current.manager.on("placingpanend", handlePlacingPanEnd);
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
    }, [handlePlacingPanEnd]);

    const exitEditingPosState = useCallback(() => {
        if (!hammerContext.current) return;

        hammerContext.current.manager.off("placingpanend", handlePlacingPanEnd);
        const card = currentCard.current;

        console.log("Exiting editing position state", card);
        
        if (card) card.classList.remove("moving");
        initEditingPosState.current = false;
    }, [handlePlacingPanEnd]);

    // ---------- Hammer Setup ----------
    useEffect(() => {
        if (!Hammer) return;
        if (!hammerContext.current) {

            hammerContext.current = {
                manager: new Hammer(document.body),
                focusTap: null,
                focusPress: null,
                focusPan: null,
                placingPan: null,
                placingMovePan: null,
            };

            const context = hammerContext.current;

            const tapRecognizer = context.manager.get("tap");
            const pressRecognizer = context.manager.get("press");
            const panRecognizer = context.manager.get("pan");

            context.focusTap = new Hammer.Tap({ event: "focustap", taps: 1, interval: 300 });
            context.focusTap.recognizeWith(tapRecognizer);

            context.focusPress = new Hammer.Press({ event: "focuspress", time: 200 });
            context.focusPress.recognizeWith(pressRecognizer);

            context.focusPan = new Hammer.Pan({ event: "focuspan", threshold: 10, pointers: 0 });
            context.focusPan.recognizeWith(panRecognizer);

            context.placingPan = new Hammer.Pan({ event: "placingpan", threshold: 15, pointers: 0 });
            context.placingPan.recognizeWith([panRecognizer, context.focusPan]);

            context.manager.add([
                context.focusTap,
                context.focusPress,
                context.focusPan,
                context.placingPan,
            ]);
        }

        return () => {
            isMounted.current = false;
            if (hammerContext.current) {
                hammerContext.current.manager.destroy();
                hammerContext.current = null;
            }

            if (focusTapResetTimeout.current) clearTimeout(focusTapResetTimeout.current);
            document.removeEventListener("pointerdown", handlePlacingPointerDown);
        };
    }, [Hammer, handlePlacingPointerDown]);

    useEffect(() => {
        if (!hammerContext.current) return;

        if (isPlacingCard(stateRef.current)) {
            if (initFocusState.current) exitFocusState();
            
            if (isPlacingCardMoving(stateRef.current) && !initEditingPosState.current) {
                entryEditingPosState();
            } else if (!isPlacingCardMoving(stateRef.current) && initEditingPosState.current) {
                exitEditingPosState();
            }
            if (!initEditingState.current) {
                entryPlacingState();
            }
        } else {
            if (!initFocusState.current) entryFocusState();
            if (initEditingPosState.current) exitEditingPosState();
            if (initEditingState.current) exitPlacingState();
        }
    }, [state, entryFocusState, exitFocusState, entryPlacingState, exitPlacingState, entryEditingPosState, exitEditingPosState]);
};