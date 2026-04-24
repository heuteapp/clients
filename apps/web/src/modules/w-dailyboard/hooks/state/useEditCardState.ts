"use client";

import { useEffect, useRef, useCallback } from "react";
import { isEditingCard, isModifyingCard, isPlacingCard, isPlacingCardIdle, isPlacingCardMoving } from "../../state/workspace-dailyboard.machine";
import { useWorkspaceDailyboardContext } from "../useWorkspaceDailyboardContext";
import { findDailyboardCardAtCursor, getDailyboardCardData } from "@/src/modules/ui-board/utils/dom.utils";
import { useHammerContext } from "@/src/modules/ui-shared/hooks/useHammerContext";
import { useDailyboardCardDragPlacement } from "../../../t-dailyboard/hooks/useDailyboardCardDragPlacement";

export const useEditCardState = () => {
    const { Hammer } = useHammerContext();
    const { send, state } = useWorkspaceDailyboardContext();
    const { dragCard } = useDailyboardCardDragPlacement();
    const { metadata } = useWorkspaceDailyboardContext();
    const { categoryPath, date } = metadata;

    // ---------- State refs (always up-to-date) ----------
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

    // ---------- Hammer context ----------
    const hammerContext = useRef<{
        manager: HammerManager;
        focusTap: TapRecognizer | null;
        focusPress: PressRecognizer | null;
        focusPan: PanRecognizer | null;
        placingPan: PanRecognizer | null;
    } | null>(null);

    // ---------- Card references ----------
    const currentCard = useRef<HTMLElement | null>(null);
    const currentCardData = useRef<{
        key: string;
        colSpan: number;
        rowSpan: number;
    } | null>(null);

    // ---------- Focus / tap state ----------
    const focusTapCard = useRef<HTMLElement | null>(null);
    const focusTapResetTimeout = useRef<NodeJS.Timeout | null>(null);
    const placingPanUsed = useRef(false);
    const isMounted = useRef(true);

    // ---------- Init flags for state transitions ----------
    const initFocusState = useRef(false);
    const initEditingState = useRef(false);
    const initPlacingState = useRef(false);
    const initPlacingMovingState = useRef(false);

    // ---------- Helper: Interactive element detection ----------
    const isInteractiveElement = (element: HTMLElement): boolean => {
        const interactiveSelectors = [
            "button",
            "a",
            '[role="button"]',
            "input",
            "textarea",
            "select",
            '[contenteditable="true"]',
            ".btn",
            ".button",
            '[data-interactive="true"]'
        ];

        let current: HTMLElement | null = element;
        while (current && current !== document.body) {
            for (const selector of interactiveSelectors) {
                if (current.matches(selector)) {
                return true;
                }
            }
            current = current.parentElement;
        }
        return false;
    };

    // ---------- Helper: Get card at cursor ignoring interactive elements ----------
    const getTargetCard = (x: number, y: number): HTMLElement | null => {
        const elementsAtCursor = document.elementsFromPoint(x, y);
        for (const element of elementsAtCursor) {
            if (element instanceof HTMLElement && isInteractiveElement(element)) {
                return null;
            }
        }
        return findDailyboardCardAtCursor(x, y);
    };

    // ---------- Request senders ----------
    const sendPlaceRequest = useCallback((card: HTMLElement) => {
        currentCard.current = card;
        currentCardData.current = getDailyboardCardData(card);
        sendRef.current({
            type: "CARD_PLACE_REQUESTED",
            categoryPath: categoryPathRef.current,
            date: dateRef.current!,
            cardKey: currentCardData.current.key,
        });
    }, []);

    const sendEditRequest = useCallback((card: HTMLElement) => {
        currentCard.current = card;
        currentCardData.current = getDailyboardCardData(card);
        sendRef.current({
            type: "CARD_EDIT_REQUESTED",
            categoryPath: categoryPathRef.current,
            date: dateRef.current!,
            cardKey: currentCardData.current.key,
        });
    }, []);

    // ---------- Event Handlers ----------
    const handleFocusTap = useCallback(
        (e: HammerInput) => {
            const { center } = e;
            const card = getTargetCard(center.x, center.y);
            if (!card) return;

            if (focusTapCard.current) {
                if (focusTapCard.current === card) {
                if (focusTapResetTimeout.current) clearTimeout(focusTapResetTimeout.current);
                    setTimeout(() => {
                        if (isMounted.current) {
                        sendEditRequest(card);
                        }
                    }, 50);
                }
            } else {
                focusTapCard.current = card;
                focusTapResetTimeout.current = setTimeout(() => {
                if (isMounted.current) focusTapCard.current = null;
                }, 500);
            }
        },
        [sendEditRequest]
    );

    const handleFocusPress = useCallback(() => {
        if (focusTapCard.current) {
            const rect = focusTapCard.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const elementsAtCenter = document.elementsFromPoint(centerX, centerY);
            
            for (const element of elementsAtCenter) {
                if (element instanceof HTMLElement && isInteractiveElement(element)) {
                    return;
                }
            }

            if (focusTapResetTimeout.current) {
                clearTimeout(focusTapResetTimeout.current);
                focusTapResetTimeout.current = null;
            }

            const cardToPlace = focusTapCard.current;
            focusTapCard.current = null;
            if (cardToPlace) {
                sendPlaceRequest(cardToPlace);
            }
        }
    }, [sendPlaceRequest]);

    const handleFocusPan = useCallback(() => {
        if (focusTapCard.current) {
        if (focusTapResetTimeout.current) {
            clearTimeout(focusTapResetTimeout.current);
            focusTapResetTimeout.current = null;
        }

        const cardToPlace = focusTapCard.current;
        focusTapCard.current = null;
        if (cardToPlace) {
            sendPlaceRequest(cardToPlace);
        }
        }
    }, [sendPlaceRequest]);

    const handlePlacingPointerDown = useCallback(
        (event: PointerEvent) => {
            if (!currentCard.current) return;
            const { clientX, clientY } = event;

            const elementsAtCursor = document.elementsFromPoint(clientX, clientY);
            for (const element of elementsAtCursor) {
                if (element instanceof HTMLElement && isInteractiveElement(element)) {
                    sendRef.current({ type: "CARD_PLACE_CANCELLED" });
                    return;
                }
            }

            const clickedCard = findDailyboardCardAtCursor(clientX, clientY);
            if (clickedCard !== currentCard.current) {
                sendRef.current({ type: "CARD_PLACE_CANCELLED" });
            }
        },
        []
    );

    const handlePlacingPan = useCallback(() => {
        if (isPlacingCardIdle(stateRef.current) && !placingPanUsed.current) {
            sendRef.current({ type: "CARD_PLACE_REPOSITION_REQUESTED" });
            placingPanUsed.current = true;
        }
    }, []);

    const handlePlacingPanEnd = useCallback(() => {
        if (placingPanUsed.current) {
            placingPanUsed.current = false;
        }
    }, []);

    // ---------- State Entry / Exit ----------
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

    const entryEditingState = useCallback(() => {
        const card = currentCard.current;
        if (card) {
            card.classList.add("editing");
        }
        initEditingState.current = true;
    }, []);

    const exitEditingState = useCallback(() => {
        const card = currentCard.current;
        if (card) {
            card.classList.remove("editing");
        }
        initEditingState.current = false;
    }, []);

    const entryPlacingState = useCallback(() => {
        if (!hammerContext.current) return;
        hammerContext.current.manager.on("placingpan", handlePlacingPan);
        hammerContext.current.manager.on("placingpanend", handlePlacingPanEnd);
        document.addEventListener("pointerdown", handlePlacingPointerDown);

        const card = currentCard.current;
        if (card) card.classList.add("placing");
        initPlacingState.current = true;
    }, [handlePlacingPointerDown, handlePlacingPan, handlePlacingPanEnd]);

    const exitPlacingState = useCallback(() => {
        if (!hammerContext.current) return;
        hammerContext.current.manager.off("placingpan", handlePlacingPan);
        hammerContext.current.manager.off("placingpanend", handlePlacingPanEnd);
        document.removeEventListener("pointerdown", handlePlacingPointerDown);
        const card = currentCard.current;

        if (card) {
            card.classList.remove("placing");
            currentCard.current = null;
            currentCardData.current = null;
        }
        initPlacingState.current = false;
    }, [handlePlacingPointerDown, handlePlacingPan, handlePlacingPanEnd]);

    const entryPlacingMovingState = useCallback(() => {
        if (!hammerContext.current) return;
        const card = currentCard.current;

        if (!card) return;

        const { colSpan, rowSpan, key } = getDailyboardCardData(card);
        let isActive = true;
        dragCardRef.current(
        { cardSize: { colSpan, rowSpan }, targetCardKey: key },
        (result) => {
            if (!isActive || !isMounted.current) return;
            if (result.success && result.placement) {
            sendRef.current({
                type: "CARD_PLACE_REPOSITION_COMPLETED",
                placement: result.placement,
            });
            }
        }
        );
        card.classList.add("moving");
        initPlacingMovingState.current = true;

        return () => {
            isActive = false;
        };
    }, []);

    const exitPlacingMovingState = useCallback(() => {
        if (!hammerContext.current) return;
        const card = currentCard.current;

        if (card) card.classList.remove("moving");
        initPlacingMovingState.current = false;
    }, []);

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
            };

            const context = hammerContext.current;
            const tapRecognizer = context.manager.get("tap");
            const pressRecognizer = context.manager.get("press");
            const panRecognizer = context.manager.get("pan");

            // focusTap: single tap
            context.focusTap = new Hammer.Tap({ event: "focustap", taps: 1, interval: 300 });
            context.focusTap.recognizeWith(tapRecognizer);

            // focusPress: long press
            context.focusPress = new Hammer.Press({ event: "focuspress", time: 200 });
            context.focusPress.recognizeWith(pressRecognizer);

            // focusPan: pan with low threshold
            context.focusPan = new Hammer.Pan({ event: "focuspan", threshold: 10, pointers: 0 });
            context.focusPan.recognizeWith(panRecognizer);

            // placingPan: pan with higher threshold for repositioning
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

    // ---------- State Machine Reaction ----------
    useEffect(() => {
        if (!hammerContext.current) return;

        if (isModifyingCard(state)) {
            // We are in a modifying state, focus should be disabled
            if (initFocusState.current) exitFocusState();

            // Editing
            if (isEditingCard(state) && !initEditingState.current) {
                entryEditingState();
            } else if (!isEditingCard(state) && initEditingState.current) {
                exitEditingState();
            }

            // Placing (idle)
            if (isPlacingCard(state) && !initPlacingState.current) {
                entryPlacingState();
            } else if (!isPlacingCard(state) && initPlacingState.current) {
                exitPlacingState();
            }

            // Placing moving
            if (isPlacingCardMoving(state) && !initPlacingMovingState.current) {
                entryPlacingMovingState();
            } else if (!isPlacingCardMoving(state) && initPlacingMovingState.current) {
                exitPlacingMovingState();
            }
        } else {
            // Not modifying: enable focus state
            if (!initFocusState.current) entryFocusState();

            // Cleanup any leftover modifying states
            if (initEditingState.current) exitEditingState();
            if (initPlacingState.current) exitPlacingState();
            if (initPlacingMovingState.current) exitPlacingMovingState();
        }
    }, [
        state,
        entryFocusState,
        exitFocusState,
        entryPlacingState,
        exitPlacingState,
        entryPlacingMovingState,
        exitPlacingMovingState,
        entryEditingState,
        exitEditingState,
    ]);
};