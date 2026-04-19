import { DailyboardCardPlacement } from "@/src/modules/dailyboard/types/dailyboard.data.types";
import { GridRect, Rect } from "@/src/modules/shared/types/common";
import { isGridRectOverlappingSome, findBestGridRectPosition } from "@/src/modules/shared/utils/common";
import { calcDailyboardCardFixedRect, calcDailyboardCardGridIndexes, findDailyboardCardsForSection, findDailyboardClosest, findDailyboardInSubtree, getDailyboardCardData } from "@/src/modules/ui-dailyboard/utils/dom.utils";
import { useLayoutContext } from "@/src/modules/ui-layout/hooks/useLayoutContext";
import { findGridAtPoint, findSectionClosest, getSectionDataForGrid, calcGridPointerAtCursor } from "@/src/modules/ui-layout/utils/dom.utils";
import { useHammerContext } from "@/src/modules/ui-shared/hooks/useHammerContext";
import { useEffect, useRef, useState, useCallback } from "react";
import { DailyboardCardPlacementResult, DailyboardCardPlacementState } from "../type/tools-dailyboard.card-placement.types";

export const useDailyboardCardDragPlacement = () => {
    const [state, setState] = useState<DailyboardCardPlacementState | null>(null);
    const stateRef = useRef(state);
    const onFinishCallbackRef = useRef<((result: DailyboardCardPlacementResult) => void) | null>(null);

    const { metrics } = useLayoutContext();
    const metricsRef = useRef(metrics);

    const { Hammer } = useHammerContext();
    const hammerRef = useRef<HammerManager | null>(null);

    // DOM element refs
    const dailyboardElement = useRef<HTMLDivElement | null>(null);
    const sectionElement = useRef<HTMLDivElement | null>(null);
    const sectionElementData = useRef<{ name: string; position: GridRect } | null>(null);
    const gridElement = useRef<HTMLDivElement | null>(null);

    const ghostCardElement = useRef<HTMLDivElement | null>(null);
    const ghostCardGridPos = useRef<GridRect | null>(null);
    const ghostCardPos = useRef<Rect | null>(null);
    const isGhostCardOverlapping = useRef<boolean>(false);

    const suggestedCardElement = useRef<HTMLDivElement | null>(null);
    const suggestedCardGridPos = useRef<GridRect | null>(null);
    const suggestedCardPos = useRef<Rect | null>(null);

    useEffect(() => {
        stateRef.current = state;
        metricsRef.current = metrics;
    }, [state, metrics]);

    useEffect(() => {
        if (Hammer && !hammerRef.current) {
        hammerRef.current = new Hammer(document.body);
        const pan = hammerRef.current.get("pan");

        const ghostCardPan = new Hammer.Pan({ event: "ghostcardpan", threshold: 0, pointers: 1 });
        ghostCardPan.recognizeWith(pan);
        hammerRef.current.add(ghostCardPan);
        }
    }, [state, Hammer]);

    // ------------------------------------------------------------------------
    const resolvePosition = useCallback((): GridRect | null => {
        if (isGhostCardOverlapping.current) {
            return suggestedCardGridPos.current;
        }
        return ghostCardGridPos.current;
    }, []);

    const resolvePlacement = useCallback((): DailyboardCardPlacement | null => {
        if (!sectionElementData.current || !ghostCardGridPos.current) return null;

        const sectionName = sectionElementData.current.name;
        const position = resolvePosition();
        if (!position) return null;

        return { sectionName, position };
    }, [resolvePosition]);

    const resolveResult = useCallback((): DailyboardCardPlacementResult => {
        const placement = resolvePlacement();
        if (placement) {
            return { state: state!, success: true, placement };
        } else {
            return { state: state!, success: false, placement: null };
        }
    }, [state, resolvePlacement]);

    // ------------------------------------------------------------------------
    const calculatePosition = useCallback((clientX: number, clientY: number) => {
        if (!stateRef.current) return;

        const { cardSize, targetCardKey } = stateRef.current;
        const cellSize = metricsRef.current.value?.cellSize.grid || 0;
        const size = {
            width: cellSize * cardSize.colSpan,
            height: cellSize * cardSize.rowSpan,
        };

        const ghostCardEl = ghostCardElement.current!;
        const gridEl = (gridElement.current = findGridAtPoint(clientX, clientY));
        const sectionEl = (sectionElement.current = gridEl ? findSectionClosest(gridEl) : null);
        const dailyboardEl = (dailyboardElement.current = sectionEl ? findDailyboardClosest(sectionEl) : null);

        isGhostCardOverlapping.current = false;

        if (gridEl && sectionEl && dailyboardEl) {
            const sectionData = getSectionDataForGrid(gridEl);
            if (!sectionData) return;

            const { name: sectionName, position: gridPos } = sectionData;
            sectionElementData.current = { name: sectionName, position: gridPos };

            const gridRect = gridEl.getBoundingClientRect();
            const gridSize = { colSpan: gridPos.colSpan, rowSpan: gridPos.rowSpan };
            const { col: mouseCol, row: mouseRow } = calcGridPointerAtCursor({ x: clientX, y: clientY }, gridRect, cellSize);
            let { col: cardCol, row: cardRow } = calcDailyboardCardGridIndexes(mouseCol, mouseRow, gridSize, cardSize);

            ghostCardGridPos.current = {
                colIndex: cardCol,
                rowIndex: cardRow,
                colSpan: cardSize.colSpan,
                rowSpan: cardSize.rowSpan,
            };

            const gap = dailyboardEl.clientWidth * 0.0075;
            ghostCardPos.current = calcDailyboardCardFixedRect(gridRect, gap, gridSize, ghostCardGridPos.current);

            const cards = findDailyboardCardsForSection(dailyboardEl, sectionName).filter((card) => {
                const cardData = getDailyboardCardData(card);
                return cardData.key !== targetCardKey;
            });

            const cardRects = cards.map(getDailyboardCardData);
            isGhostCardOverlapping.current = isGridRectOverlappingSome(ghostCardGridPos.current, cardRects);

            if (isGhostCardOverlapping.current) {
                const bestPos = findBestGridRectPosition(ghostCardGridPos.current, cardRects, gridSize);
                if (bestPos) {
                    suggestedCardGridPos.current = bestPos;
                    suggestedCardPos.current = calcDailyboardCardFixedRect(gridRect, gap, gridSize, suggestedCardGridPos.current);
                } else {
                    suggestedCardGridPos.current = null;
                    suggestedCardPos.current = null;
                }
            } 
            else {
                ghostCardEl.classList.remove("overlapping");
                suggestedCardGridPos.current = null;
                suggestedCardPos.current = null;
            }
        } 
        else {
            sectionElement.current = null;
            sectionElementData.current = null;
            ghostCardGridPos.current = null;
            ghostCardPos.current = {
                x: clientX - size.width / 2,
                y: clientY - size.height / 2,
                width: size.width,
                height: size.height,
            };
            suggestedCardGridPos.current = null;
            suggestedCardPos.current = null;
        }
    },[metrics]);

    const updateGhostCard = useCallback(
        (clientX: number, clientY: number) => {
        const ghostCard = ghostCardElement.current;
        if (!ghostCard) return;

        calculatePosition(clientX, clientY);
        if (!ghostCardPos.current) return;

        ghostCard.style.left = `${ghostCardPos.current.x}px`;
        ghostCard.style.top = `${ghostCardPos.current.y}px`;
        ghostCard.style.width = `${ghostCardPos.current.width}px`;
        ghostCard.style.height = `${ghostCardPos.current.height}px`;

        if (suggestedCardPos.current) {
            if (!suggestedCardElement.current) {
                suggestedCardElement.current = document.createElement("div");
                suggestedCardElement.current.id = "dailyboard-suggested-card";
                document.body.appendChild(suggestedCardElement.current);
            }

            suggestedCardElement.current.style.left = `${suggestedCardPos.current.x}px`;
            suggestedCardElement.current.style.top = `${suggestedCardPos.current.y}px`;
            suggestedCardElement.current.style.width = `${suggestedCardPos.current.width}px`;
            suggestedCardElement.current.style.height = `${suggestedCardPos.current.height}px`;
        } 
        else if (suggestedCardElement.current) {
            document.body.removeChild(suggestedCardElement.current);
            suggestedCardElement.current = null;
        }
        },
        [calculatePosition]
    );

    const handleGhostCardPan = useCallback((event: HammerInput) => {
        const { x, y } = event.center;
        updateGhostCard(x, y);
    }, [updateGhostCard]);

    // ------------------------------------------------------------------------
    const destroy = useCallback(() => {
        if (!ghostCardElement.current) return true;

        document.body.removeChild(ghostCardElement.current);
        if (suggestedCardElement.current) {
            document.body.removeChild(suggestedCardElement.current);
        }

        hammerRef.current?.off("ghostcardpan", handleGhostCardPan);
        hammerRef.current?.off("ghostcardpanend", drop);

        // Clear refs
        dailyboardElement.current = null;
        sectionElement.current = null;
        sectionElementData.current = null;
        gridElement.current = null;
        ghostCardElement.current = null;
        ghostCardGridPos.current = null;
        ghostCardPos.current = null;
        isGhostCardOverlapping.current = false;
        suggestedCardElement.current = null;
        suggestedCardGridPos.current = null;
        suggestedCardPos.current = null;

        return true;
    }, [handleGhostCardPan]);

    const initialize = useCallback(() => {
        dailyboardElement.current = findDailyboardInSubtree(document.body);
        if (!dailyboardElement.current) return false;
        if (ghostCardElement.current) return false;

        ghostCardElement.current = document.createElement("div");
        ghostCardElement.current.id = "dailyboard-ghost-card";
        document.body.appendChild(ghostCardElement.current);

        hammerRef.current?.on("ghostcardpan", handleGhostCardPan);
        hammerRef.current?.on("ghostcardpanend", drop);

        return true;
    }, [handleGhostCardPan]);

    // ------------------------------------------------------------------------
    const drop = useCallback(() => {
        if (stateRef.current) {
            setState(null);
            onFinishCallbackRef.current?.(resolveResult());
            destroy();
        }
        return false;
    }, [destroy, resolveResult]);

    const drag = useCallback((input: DailyboardCardPlacementState, onFinish: (result: DailyboardCardPlacementResult) => void) => {
        if (!stateRef.current) {
            setState(input);
            onFinishCallbackRef.current = onFinish;
            return initialize();
        }
        return false;
    }, [initialize]);

    return { dragCard: drag };
};