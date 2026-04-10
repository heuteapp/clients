import { useEffect } from "react";
import { isCreatingCard } from "../../state/workspace-dailyboard.machine";
import { useWorkspaceDailyboardContext } from "../useWorkspaceDailyboardContext";
import { useLayoutContext } from "@/src/modules/ui-layout/hooks/useLayoutContext";
import { GridRect, Rect } from "@/src/modules/shared/types/common";
import { findGridAtPoint, calcGridPointerAtCursor, getSectionDataForGrid, getSectionData, findSectionClosest } from "@/src/modules/ui-layout/utils/dom.utils";
import { calcDailyboardCardGridIndexes, calcDailyboardCardFixedRect, getDailyboardCardData, findDailyboardCardsForSection, findDailyboardClosest } from "@/src/modules/ui-dailyboard/utils/dom.utils";
import { DailyboardCardPlacement } from "@/src/modules/dailyboard/types/dailyboard.data.types";
import { findBestGridRectPosition, isGridRectOverlappingSome } from "@/src/modules/shared/utils/common";

export const useCreateCardState = () => {
    const { metadata } = useWorkspaceDailyboardContext();
    const { categoryPath, date } = metadata;

    const { send, state } = useWorkspaceDailyboardContext();
    const { metrics } = useLayoutContext();
    
    useEffect(() => {
        if(isCreatingCard(state)) {
            return resolveCreatingCard();
        }
    }, [state]);

    const resolveCreatingCard = () => {
        const ghostCard = document.createElement("div");
        ghostCard.id = "dailyboard-ghost-card";

        let suggestedCard : HTMLDivElement | null = null;
        let suggestedCardGridPos : GridRect | null = null;
        let suggestedCardPos : Rect | null = null;

        document.body.appendChild(ghostCard);
        const cardUnit = state.context.create?.size || { colSpan: 1, rowSpan: 1 };

        let gridEl : HTMLDivElement | null = null;
        let dailyboardEl : HTMLDivElement | null = null;
        let sectionEl: HTMLDivElement | null = null;        
        let ghostCardGridPos : GridRect | null = null;
        let ghostCardPos : Rect | null = null;
        let isOverlapping = false;

        const calculatePosition = (clientX: number, clientY: number) => {
            const size = {
                width: ((metrics.cellSize.grid || 0) * cardUnit.colSpan),
                height: ((metrics.cellSize.grid || 0) * cardUnit.rowSpan)
            }

            gridEl = findGridAtPoint(clientX, clientY);
            sectionEl = gridEl ? findSectionClosest(gridEl) : null;
            dailyboardEl = sectionEl ? findDailyboardClosest(sectionEl) : null;

            if(gridEl && sectionEl && dailyboardEl) {
                const { name: sectionName, position: gridPos } = getSectionDataForGrid(gridEl)!;

                const gridRect = gridEl.getBoundingClientRect();
                const cellSize = metrics.cellSize.grid || 0;

                const gridSize = { colSpan: gridPos.colSpan, rowSpan: gridPos.rowSpan };
                const { col: mouseCol, row: mouseRow } = calcGridPointerAtCursor({ x: clientX, y: clientY }, gridRect, cellSize);
                let { col: cardCol, row: cardRow } = calcDailyboardCardGridIndexes(mouseCol, mouseRow, gridSize, cardUnit);

                ghostCardGridPos = { colIndex: cardCol, rowIndex: cardRow, colSpan: cardUnit.colSpan, rowSpan: cardUnit.rowSpan };

                const gap = 8;
                ghostCardPos = calcDailyboardCardFixedRect(gridRect, gap, gridSize, ghostCardGridPos);

                const cards = findDailyboardCardsForSection(dailyboardEl, sectionName);

                const cardRects = cards.map(getDailyboardCardData);
                isOverlapping = isGridRectOverlappingSome(ghostCardGridPos, cardRects);

                if(isOverlapping) {
                    const bestPos = findBestGridRectPosition(ghostCardGridPos, cardRects, gridSize);

                    if (bestPos) {
                        suggestedCardGridPos = bestPos;
                        suggestedCardPos = calcDailyboardCardFixedRect(gridRect, gap * 1.5, gridSize, suggestedCardGridPos);
                    }
                    else {
                        suggestedCardGridPos = null;
                        suggestedCardPos = null;
                    }
                }
                else {
                    ghostCard.classList.remove("overlapping");
                    suggestedCardGridPos = null;
                    suggestedCardPos = null;
                }
            }
            else {
                sectionEl = null;

                ghostCardGridPos = null;

                ghostCardPos = {
                    x: clientX - (size.width / 2),
                    y: clientY - (size.height / 2),
                    width: size.width,
                    height: size.height
                };

                                    suggestedCardGridPos = null;
                    suggestedCardPos = null;
            }
        };

        const updateGhostCard = (clientX: number, clientY: number) => {
            if(!ghostCard) return;

            calculatePosition(clientX, clientY);

            if(!ghostCardPos) return;
            
            ghostCard.style.left = `${ghostCardPos.x}px`;
            ghostCard.style.top = `${ghostCardPos.y}px`;
            ghostCard.style.width = `${ghostCardPos.width}px`;
            ghostCard.style.height = `${ghostCardPos.height}px`;

            if(suggestedCardPos) {
                if(!suggestedCard) {
                    suggestedCard = document.createElement("div");
                    suggestedCard.id = "dailyboard-suggested-card";
                    document.body.appendChild(suggestedCard);
                }

                suggestedCard.style.left = `${suggestedCardPos.x}px`;
                suggestedCard.style.top = `${suggestedCardPos.y}px`;
                suggestedCard.style.width = `${suggestedCardPos.width}px`;
                suggestedCard.style.height = `${suggestedCardPos.height}px`;
            }
            else {
                if(suggestedCard) {
                    document.body.removeChild(suggestedCard);
                    suggestedCard = null;
                }
            }
        };

        const handleMove = (clientX: number, clientY: number) => {
            updateGhostCard(clientX, clientY);
        };

        const handleEnd = () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", onTouchEnd);

            if(gridEl && ghostCardGridPos && ghostCardPos && sectionEl && (!isOverlapping || suggestedCardGridPos)) {
                const { name: sectionName } = getSectionData(sectionEl)!;

                const placement : DailyboardCardPlacement = {
                    sectionName: sectionName || "",
                    position: suggestedCardGridPos ? suggestedCardGridPos : ghostCardGridPos
                }

                send({ type: "CARD_CREATE_SUCCEEDED", categoryPath, date: date!, placement });
            }
            else {
                send({ type: "CARD_CREATE_CANCELLED" });
            }

            document.body.removeChild(ghostCard);

            if(suggestedCard) {
                document.body.removeChild(suggestedCard);
            }
        };

        const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
        const onMouseUp = () => handleEnd();
        
        const onTouchMove = (e: TouchEvent) => {
            const touch = e.touches[0];
            if(touch) handleMove(touch.clientX, touch.clientY);
        };
        const onTouchEnd = () => handleEnd();

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("touchmove", onTouchMove, { passive: false });
        window.addEventListener("touchend", onTouchEnd);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", onTouchEnd);
        };
    }
}