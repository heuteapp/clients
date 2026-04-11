import { DailyboardCardPlacement } from "@/src/modules/dailyboard/types/dailyboard.data.types";
import { GridRect, GridSize, Rect } from "@/src/modules/shared/types/common";
import { isGridRectOverlappingSome, findBestGridRectPosition } from "@/src/modules/shared/utils/common";
import { calcDailyboardCardFixedRect, calcDailyboardCardGridIndexes, findDailyboardCardsForSection, findDailyboardClosest, findDailyboardInSubtree, getDailyboardCardData } from "@/src/modules/ui-dailyboard/utils/dom.utils";
import { useLayoutContext } from "@/src/modules/ui-layout/hooks/useLayoutContext";
import { findGridAtPoint, findSectionClosest, getSectionDataForGrid, calcGridPointerAtCursor } from "@/src/modules/ui-layout/utils/dom.utils";
import { useHammerLoader } from "@/src/modules/ui-shared/hooks/useHammerLoader";
import { useEffect, useRef, useState } from "react";

export const useCardPlacementByDrag = () => {
    const [state, setState] = useState<{ cardSize: GridSize } | null>(null);
    const onFinishCallbackRef = useRef<((placement: DailyboardCardPlacement | null) => void) | null>(null);  
      
    const stateRef = useRef(state);

    useEffect(() => {
        stateRef.current = state;
    }, [state]);
    
    const { metrics } = useLayoutContext();

    const { Hammer } = useHammerLoader();
    const hammerRef = useRef<HammerManager | null>(null);

    const dailyboardElement = useRef<HTMLDivElement | null>(null);
    const sectionElement = useRef<HTMLDivElement | null>(null);
    const sectionElementData = useRef<{ name: string, position: GridRect } | null>(null);
    const gridElement = useRef<HTMLDivElement | null>(null);

    const ghostCardElement = useRef<HTMLDivElement | null>(null);
    const ghostCardGridPos = useRef<GridRect | null>(null);
    const ghostCardPos = useRef<Rect | null>(null);
    const isGhostCardOverlapping = useRef<boolean>(false);

    const suggestedCardElement = useRef<HTMLDivElement | null>(null);
    const suggestedCardGridPos = useRef<GridRect | null>(null);
    const suggestedCardPos = useRef<Rect | null>(null);

    useEffect(() => {
        if(Hammer && !hammerRef.current) {
            hammerRef.current = new Hammer(document.body);

            const pan = hammerRef.current.get('pan');

            const ghostCardPan = new Hammer.Pan({ event: 'ghostcardpan', threshold: 0, pointers: 1 });
            ghostCardPan.recognizeWith(pan);

            hammerRef.current.add(ghostCardPan);
        }
    }, [state, Hammer]);

    //

    const drag = (cardSize: GridSize, onFinish: (placement: DailyboardCardPlacement | null) => void) => {
        if(!stateRef.current) {
            setState({ cardSize });
            onFinishCallbackRef.current = onFinish;
            return initialize();
        }

        return false;
    }

    const drop = () => {
        if(stateRef.current) {
            setState(null);
            onFinishCallbackRef.current?.(resolvePlacement());
            return destroy();
        }

        return false;
    }

    //

    const handleGhostCardPan = (event: HammerInput) => {
        const { x, y } = event.center;
        updateGhostCard(x, y);
    }

    //

    const initialize = () => {
        dailyboardElement.current = findDailyboardInSubtree(document.body);

        if(!dailyboardElement.current) return false;
        if(ghostCardElement.current) return false;

        ghostCardElement.current = document.createElement("div");
        ghostCardElement.current.id = "dailyboard-ghost-card";

        document.body.appendChild(ghostCardElement.current);
        hammerRef.current?.on("ghostcardpan", handleGhostCardPan);
        hammerRef.current?.on("ghostcardpanend", drop);

        return true;
    }

    const destroy = () => {
        if(!ghostCardElement.current) return true;
        
        document.body.removeChild(ghostCardElement.current);

        if(suggestedCardElement.current) {
            document.body.removeChild(suggestedCardElement.current);
        }

        hammerRef.current?.off("ghostcardpan", handleGhostCardPan);
        hammerRef.current?.off("ghostcardpanend", drop);

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
    }

    const resolvePlacement = (): DailyboardCardPlacement | null => {
        if(!sectionElementData.current || !ghostCardGridPos.current) return null;

        const sectionName = sectionElementData.current.name;
        const position = resolvePosition();

        if(!position) return null;

        return {
            sectionName,
            position
        }
    }

    const resolvePosition = (): GridRect | null => {
        if(isGhostCardOverlapping.current) {
            return suggestedCardGridPos.current;
        }

        return ghostCardGridPos.current;
    }

    //

    const calculatePosition = (clientX: number, clientY: number) => {
        if(!stateRef.current) return;

        const { cardSize } = stateRef.current;

        const size = {
            width: ((metrics.cellSize.grid || 0) * cardSize.colSpan),
            height: ((metrics.cellSize.grid || 0) * cardSize.rowSpan)
        }

        const ghostCardEl = ghostCardElement.current!;

        const gridEl = gridElement.current = findGridAtPoint(clientX, clientY);
        const sectionEl = sectionElement.current = gridElement.current ? findSectionClosest(gridElement.current) : null;
        const dailyboardEl = dailyboardElement.current = sectionElement.current ? findDailyboardClosest(sectionElement.current) : null;

        isGhostCardOverlapping.current = false;

        if(
            gridEl && 
            sectionEl && 
            dailyboardEl
        ) {
            const { name: sectionName, position: gridPos } = sectionElementData.current = getSectionDataForGrid(gridEl)!;

            const gridRect = gridEl.getBoundingClientRect();
            const cellSize = metrics.cellSize.grid || 0;

            const gridSize = { colSpan: gridPos.colSpan, rowSpan: gridPos.rowSpan };
            const { col: mouseCol, row: mouseRow } = calcGridPointerAtCursor({ x: clientX, y: clientY }, gridRect, cellSize);
            let { col: cardCol, row: cardRow } = calcDailyboardCardGridIndexes(mouseCol, mouseRow, gridSize, cardSize);

            ghostCardGridPos.current = { colIndex: cardCol, rowIndex: cardRow, colSpan: cardSize.colSpan, rowSpan: cardSize.rowSpan };

            const gap = 8;
            ghostCardPos.current = calcDailyboardCardFixedRect(gridRect, gap, gridSize, ghostCardGridPos.current);

            const cards = findDailyboardCardsForSection(dailyboardEl, sectionName);

            const cardRects = cards.map(getDailyboardCardData);
            isGhostCardOverlapping.current = isGridRectOverlappingSome(ghostCardGridPos.current, cardRects);

            if(isGhostCardOverlapping.current) {
                const bestPos = findBestGridRectPosition(ghostCardGridPos.current, cardRects, gridSize);

                if (bestPos) {
                    suggestedCardGridPos.current = bestPos;
                    suggestedCardPos.current = calcDailyboardCardFixedRect(gridRect, gap, gridSize, suggestedCardGridPos.current);
                }
                else {
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
            sectionElementData.current= null;

            ghostCardGridPos.current = null;

            ghostCardPos.current = {
                x: clientX - (size.width / 2),
                y: clientY - (size.height / 2),
                width: size.width,
                height: size.height
            };

            suggestedCardGridPos.current = null;
            suggestedCardPos.current = null;
        }
    };

    const updateGhostCard = (clientX: number, clientY: number) => {
        const ghostCard = ghostCardElement.current;

        if(!ghostCard) return;

        calculatePosition(clientX, clientY);

        if(!ghostCardPos.current) return;
        
        ghostCard.style.left = `${ghostCardPos.current.x}px`;
        ghostCard.style.top = `${ghostCardPos.current.y}px`;
        ghostCard.style.width = `${ghostCardPos.current.width}px`;
        ghostCard.style.height = `${ghostCardPos.current.height}px`;

        if(suggestedCardPos.current) {
            if(!suggestedCardElement.current) {
                suggestedCardElement.current = document.createElement("div");
                suggestedCardElement.current.id = "dailyboard-suggested-card";
                document.body.appendChild(suggestedCardElement.current);
            }

            suggestedCardElement.current.style.left = `${suggestedCardPos.current.x}px`;
            suggestedCardElement.current.style.top = `${suggestedCardPos.current.y}px`;
            suggestedCardElement.current.style.width = `${suggestedCardPos.current.width}px`;
            suggestedCardElement.current.style.height = `${suggestedCardPos.current.height}px`;
        }
        else {
            if(suggestedCardElement.current) {
                document.body.removeChild(suggestedCardElement.current);
                suggestedCardElement.current = null;
            }
        }
    };

    return { drag };
}