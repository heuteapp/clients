import { GridRect, GridSize, Rect } from "@/src/modules/shared/types/common";
import { isGridRectOverlappingSome, findBestGridRectPosition } from "@/src/modules/shared/utils/common";
import { calcDailyboardCardFixedRect, calcDailyboardCardGridIndexes, findDailyboardCardsForSection, findDailyboardClosest, findDailyboardInSubtree, getDailyboardCardData } from "@/src/modules/ui-dailyboard/utils/dom.utils";
import { useLayoutContext } from "@/src/modules/ui-layout/hooks/useLayoutContext";
import { findGridAtPoint, findSectionClosest, getSectionDataForGrid, calcGridPointerAtCursor } from "@/src/modules/ui-layout/utils/dom.utils";
import { useEffect, useRef, useState } from "react";

export const useGhostCard = () => {
    const [isActive, setIsActive] = useState(false);
    const [cardSize, setCardSize] = useState<GridSize | null>(null);
    
    const { metrics } = useLayoutContext();

    const dailyboardElement = useRef<HTMLDivElement | null>(null);
    const sectionElement = useRef<HTMLDivElement | null>(null);
    const gridElement = useRef<HTMLDivElement | null>(null);

    const ghostCardElement = useRef<HTMLDivElement | null>(null);
    const ghostCardGridPos = useRef<GridRect | null>(null);
    const ghostCardPos = useRef<Rect | null>(null);
    const isGhostCardOverlapping = useRef<boolean>(false);

    const suggestedCardElement = useRef<HTMLDivElement | null>(null);
    const suggestedCardGridPos = useRef<GridRect | null>(null);
    const suggestedCardPos = useRef<Rect | null>(null);

    useEffect(() => {
        if(isActive && cardSize) {
            dailyboardElement.current = findDailyboardInSubtree(document.body);

            createGhostCard();
        }
        else {
            dailyboardElement.current = null;

            removeGhostCard();
        }
    }, [isActive]);

    //

    const calculatePosition = (clientX: number, clientY: number) => {
        if(!isActive || !cardSize) return;

        const size = {
            width: ((metrics.cellSize.grid || 0) * cardSize.colSpan),
            height: ((metrics.cellSize.grid || 0) * cardSize.rowSpan)
        }

        const ghostCardEl = ghostCardElement.current!;

        const gridEl = gridElement.current = findGridAtPoint(clientX, clientY);
        const sectionEl = sectionElement.current = gridElement.current ? findSectionClosest(gridElement.current) : null;
        const dailyboardEl = dailyboardElement.current = sectionElement.current ? findDailyboardClosest(sectionElement.current) : null;

        const isOverlapping = isGhostCardOverlapping.current = false;

        if(
            gridEl && 
            sectionEl && 
            dailyboardEl
        ) {
            const { name: sectionName, position: gridPos } = getSectionDataForGrid(gridEl)!;

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

            if(isOverlapping) {
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

    //

    const createGhostCard = () => {
        if(!dailyboardElement.current) return;
        if(ghostCardElement.current) return;

        ghostCardElement.current = document.createElement("div");
        ghostCardElement.current.id = "dailyboard-ghost-card";

        document.body.appendChild(ghostCardElement.current);
    }

    const removeGhostCard = () => {
        if(!ghostCardElement.current) return;

        document.body.removeChild(ghostCardElement.current);
        ghostCardElement.current = null;
    }

    //

    const start = (cardSize: GridSize) => {
        if(!isActive) {
            setIsActive(true);
            setCardSize(cardSize);
            return true;
        }

        return false;
    }

    const finish = () => {
        if(isActive) {
            setIsActive(false);
            setCardSize(null);
            return true;
        }

        return false;
    }

    return { start, finish };
}