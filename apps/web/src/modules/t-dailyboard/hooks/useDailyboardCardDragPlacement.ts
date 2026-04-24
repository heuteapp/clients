import { BoardCardPlacement } from "@/src/modules/d-board/types/board.types";
import { GridRect } from "@/src/modules/d-shared/types/common";
import { isGridRectOverlappingSome, findBestGridRectPosition } from "@/src/modules/d-shared/utils/common";
import { calcDailyboardCardFixedRect, calcDailyboardCardGridIndexes, findAllDailyboardCardsForGrid, findDailyboardClosest, findDailyboardInSubtree, getDailyboardCardData } from "@/src/modules/ui-board/utils/dom.utils";
import { useCanvasContext } from "@/src/modules/ui-canvas/hooks/useCanvasContext";
import { findCanvasGridAtPoint, calcGridPointerAtCursor } from "@/src/modules/ui-canvas/utils/dom.utils";
import { useHammerContext } from "@/src/modules/ui-core/hooks/useHammerContext";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { DailyboardCardPlacementResult, DailyboardCardPlacementContent, DailyboardCardPlacementState } from "../type/tools-dailyboard.card-placement.types";

export const useDailyboardCardDragPlacement = () => {
    const [content, setContent] = useState<DailyboardCardPlacementContent | null>(null);
    const { metrics: canvasMetrics } = useCanvasContext();
    const { Hammer } = useHammerContext();

    const state = useMemo<DailyboardCardPlacementState>(() => ({
        content: null,
        hammer: null,
        canvasMetrics: null,

        dailyboardElement: null,
        gridElement: null,
        gridElementData: null,
        
        ghostCardElement: null,
        ghostCardGridPos: null,
        ghostCardPos: null,
        isGhostCardOverlapping: false,

        suggestedCardElement: null,
        suggestedCardGridPos: null,
        suggestedCardPos: null,
    }), []);

    const onFinishCallbackRef = useRef<((result: DailyboardCardPlacementResult) => void) | null>(null);

    useEffect(() => {
        state.content = content;
        state.canvasMetrics = canvasMetrics;
    }, [content, canvasMetrics, state]);

    useEffect(() => {
        if (Hammer && !state.hammer) {
            state.hammer = new Hammer(document.body);
            const pan = state.hammer.get("pan");

            const ghostCardPan = new Hammer.Pan({ event: "ghostcardpan", threshold: 0, pointers: 1 });
            ghostCardPan.recognizeWith(pan);
            state.hammer.add(ghostCardPan);
        }
    }, [Hammer, state]);

    const resolvePosition = useCallback((): GridRect | null => {
        if (state.isGhostCardOverlapping) {
            return state.suggestedCardGridPos;
        }
        return state.ghostCardGridPos;
    }, [state.isGhostCardOverlapping, state.suggestedCardGridPos, state.ghostCardGridPos]);

    const resolvePlacement = useCallback((): BoardCardPlacement | null => {
        if (!state.gridElementData || !state.ghostCardGridPos) return null;

        const gridName = state.gridElementData.name;
        const position = resolvePosition();
        if (!position) return null;

        return { gridName, position };
    }, [state.gridElementData, state.ghostCardGridPos, resolvePosition]);

    const resolveResult = useCallback((): DailyboardCardPlacementResult => {
        const placement = resolvePlacement();
        if (placement) {
            return { content: content!, success: true, placement };
        } else {
            return { content: content!, success: false, placement: null };
        }
    }, [content, resolvePlacement]);

    const calculatePosition = useCallback((clientX: number, clientY: number) => {
        if (!state.content) return;

        const { cardSize, targetCardKey } = state.content;
        const cellSize = state.canvasMetrics?.value?.cellSize?.grid || 0;
        const size = {
            width: cellSize * cardSize.colSpan,
            height: cellSize * cardSize.rowSpan,
        };

        const ghostCardEl = state.ghostCardElement!;
        const gridEl = (state.gridElement = findCanvasGridAtPoint(clientX, clientY));
        const dailyboardEl = (state.dailyboardElement = gridEl ? findDailyboardClosest(gridEl) : null);

        state.isGhostCardOverlapping = false;

        if (gridEl && gridEl && dailyboardEl) {
            const gridData = getGridDataForGrid(gridEl);
            if (!gridData) return;

            const { name: gridName, position: gridPos } = gridData;
            state.gridElementData = { name: gridName, position: gridPos };

            const gridRect = gridEl.getBoundingClientRect();
            const gridSpan = { colSpan: gridPos.colSpan, rowSpan: gridPos.rowSpan };
            const { col: mouseCol, row: mouseRow } = calcGridPointerAtCursor({ x: clientX, y: clientY }, gridRect, cellSize);
            let { col: cardCol, row: cardRow } = calcDailyboardCardGridIndexes(mouseCol, mouseRow, gridSpan, cardSize);

            state.ghostCardGridPos = {
                colIndex: cardCol,
                rowIndex: cardRow,
                colSpan: cardSize.colSpan,
                rowSpan: cardSize.rowSpan,
            };

            const gap = dailyboardEl.clientWidth * 0.0075;
            state.ghostCardPos = calcDailyboardCardFixedRect(gridRect, gap, gridSpan, state.ghostCardGridPos);

            const cards = findAllDailyboardCardsForGrid(dailyboardEl, gridName).filter((card) => {
                const cardData = getDailyboardCardData(card);
                return cardData.key !== targetCardKey;
            });

            const cardRects = cards.map(getDailyboardCardData);
            state.isGhostCardOverlapping = isGridRectOverlappingSome(state.ghostCardGridPos, cardRects);

            if (state.isGhostCardOverlapping) {
                const bestPos = findBestGridRectPosition(state.ghostCardGridPos, cardRects, gridSpan);
                if (bestPos) {
                    state.suggestedCardGridPos = bestPos;
                    state.suggestedCardPos = calcDailyboardCardFixedRect(gridRect, gap, gridSpan, state.suggestedCardGridPos);
                } else {
                    state.suggestedCardGridPos = null;
                    state.suggestedCardPos = null;
                }
            } else {
                ghostCardEl.classList.remove("overlapping");
                state.suggestedCardGridPos = null;
                state.suggestedCardPos = null;
            }
        } else {
            state.gridElement = null;
            state.gridElementData = null;
            state.ghostCardGridPos = null;
            state.ghostCardPos = {
                x: clientX - size.width / 2,
                y: clientY - size.height / 2,
                width: size.width,
                height: size.height,
            };
            state.suggestedCardGridPos = null;
            state.suggestedCardPos = null;
        }
    }, [state]);

    const updateGhostCard = useCallback((clientX: number, clientY: number) => {
        const ghostCard = state.ghostCardElement;
        if (!ghostCard) return;

        calculatePosition(clientX, clientY);
        if (!state.ghostCardPos) return;

        ghostCard.style.left = `${state.ghostCardPos.x}px`;
        ghostCard.style.top = `${state.ghostCardPos.y}px`;
        ghostCard.style.width = `${state.ghostCardPos.width}px`;
        ghostCard.style.height = `${state.ghostCardPos.height}px`;

        if (state.suggestedCardPos) {
            if (!state.suggestedCardElement) {
                state.suggestedCardElement = document.createElement("div");
                state.suggestedCardElement.id = "dailyboard-suggested-card";
                document.body.appendChild(state.suggestedCardElement);
            }

            state.suggestedCardElement.style.left = `${state.suggestedCardPos.x}px`;
            state.suggestedCardElement.style.top = `${state.suggestedCardPos.y}px`;
            state.suggestedCardElement.style.width = `${state.suggestedCardPos.width}px`;
            state.suggestedCardElement.style.height = `${state.suggestedCardPos.height}px`;
        } else if (state.suggestedCardElement) {
            document.body.removeChild(state.suggestedCardElement);
            state.suggestedCardElement = null;
        }
    }, [state, calculatePosition]);

    const handleGhostCardPan = useCallback((event: HammerInput) => {
        const { x, y } = event.center;
        updateGhostCard(x, y);
    }, [updateGhostCard]);

    const destroy = useCallback(() => {
        if (!state.ghostCardElement) return true;

        document.body.removeChild(state.ghostCardElement);
        if (state.suggestedCardElement) {
            document.body.removeChild(state.suggestedCardElement);
        }

        state.hammer?.off("ghostcardpan", handleGhostCardPan);
        state.hammer?.off("ghostcardpanend", drop);

        state.dailyboardElement = null;
        state.gridElement = null;
        state.gridElementData = null;
        state.gridElement = null;
        state.ghostCardElement = null;
        state.ghostCardGridPos = null;
        state.ghostCardPos = null;
        state.isGhostCardOverlapping = false;
        state.suggestedCardElement = null;
        state.suggestedCardGridPos = null;
        state.suggestedCardPos = null;

        return true;
    }, [state, handleGhostCardPan]);

    const drop = useCallback(() => {
        if (state.content) {
            setContent(null);
            onFinishCallbackRef.current?.(resolveResult());
            destroy();
        }
        return false;
    }, [state.content, destroy, resolveResult]);

    const initialize = useCallback(() => {
        state.dailyboardElement = findDailyboardInSubtree(document.body);
        if (!state.dailyboardElement) return false;
        if (state.ghostCardElement) return false;

        state.ghostCardElement = document.createElement("div");
        state.ghostCardElement.id = "dailyboard-ghost-card";
        document.body.appendChild(state.ghostCardElement);

        state.hammer?.on("ghostcardpan", handleGhostCardPan);
        state.hammer?.on("ghostcardpanend", drop);

        return true;
    }, [state, handleGhostCardPan, drop]);

    const drag = useCallback((input: DailyboardCardPlacementContent, onFinish: (result: DailyboardCardPlacementResult) => void) => {
        if (!state.content) {
            setContent(input);
            onFinishCallbackRef.current = onFinish;
            return initialize();
        }
        return false;
    }, [state.content, initialize]);

    return { dragCard: drag };
};