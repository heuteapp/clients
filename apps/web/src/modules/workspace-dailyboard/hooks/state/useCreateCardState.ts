import { useEffect } from "react";
import { isCreatingCard } from "../../state/workspace-dailyboard.machine";
import { useWorkspaceDailyboardContext } from "../useWorkspaceDailyboardContext";
import { useLayoutContext } from "@/src/modules/ui-layout/hooks/useLayoutContext";
import { GridRect, Rect } from "@/src/modules/shared/types/common";
import { findGridAtPoint, getCellAtCursor, getDailyboardParent, getGridMeta, getSectionMeta, getSectionParent } from "@/src/modules/ui-layout/utils/dom.utils";
import { getCardAnchorCell, getCardPixelRect, getDailyboardCardData, getDailyboardCardsForSection } from "@/src/modules/ui-dailyboard/utils/dom.utils";
import { DailyboardCardPlacement } from "@/src/modules/dailyboard/types/dailyboard.data.types";

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

        document.body.appendChild(ghostCard);
        const cardUnit = state.context.ghostCard?.size || { colSpan: 1, rowSpan: 1 };

        let gridEl : HTMLDivElement | null = null;
        let dailyboardEl : HTMLDivElement | null = null;
        let sectionEl: HTMLDivElement | null = null;        
        let ghostCardGridPos : GridRect | null = null;
        let ghostCardPos : Rect | null = null;

        const calculatePosition = (clientX: number, clientY: number) => {
            const size = {
                width: ((metrics.cellSize.grid || 0) * cardUnit.colSpan),
                height: ((metrics.cellSize.grid || 0) * cardUnit.rowSpan)
            }

            gridEl = findGridAtPoint(clientX, clientY);
            sectionEl = gridEl ? getSectionParent(gridEl) : null;
            dailyboardEl = sectionEl ? getDailyboardParent(sectionEl) : null;

            if(gridEl && sectionEl && dailyboardEl) {
                const { name: sectionName } = getSectionMeta(sectionEl);

                const gridRect = gridEl.getBoundingClientRect();
                const cellSize = metrics.cellSize.grid || 0;

                const { sectionSize } = getGridMeta(gridEl);
                const { col: mouseCol, row: mouseRow } = getCellAtCursor({ x: clientX, y: clientY }, gridRect, cellSize);
                let { col: cardCol, row: cardRow } = getCardAnchorCell(mouseCol, mouseRow, sectionSize, cardUnit);

                ghostCardGridPos = { colIndex: cardCol, rowIndex: cardRow, colSpan: cardUnit.colSpan, rowSpan: cardUnit.rowSpan };

                const gap = gridRect.width * 0.005;
                ghostCardPos = getCardPixelRect(gridRect, gap, sectionSize, ghostCardGridPos);

                const cards = getDailyboardCardsForSection(dailyboardEl, sectionName);

                const overlappingCard = cards.find(card => {
                    const cardRect = getDailyboardCardData(card);
                    if(!ghostCardGridPos) return;

                    return !(ghostCardGridPos.colIndex + ghostCardGridPos.colSpan <= cardRect.colIndex ||
                             ghostCardGridPos.colIndex >= cardRect.colIndex + cardRect.colSpan ||
                             ghostCardGridPos.rowIndex + ghostCardGridPos.rowSpan <= cardRect.rowIndex ||
                             ghostCardGridPos.rowIndex >= cardRect.rowIndex + cardRect.rowSpan);
                });

                if(overlappingCard) {
                    ghostCard.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
                }
                else {
                    ghostCard.style.backgroundColor = "transparent";
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
        };

        const handleMove = (clientX: number, clientY: number) => {
            updateGhostCard(clientX, clientY);
        };

        const handleEnd = () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", onTouchEnd);

            if(gridEl && ghostCardGridPos && ghostCardPos && sectionEl) {
                const { name: sectionName } = getSectionMeta(sectionEl);

                const placement : DailyboardCardPlacement = {
                    sectionName: sectionName || "",
                    position: ghostCardGridPos
                }

                send({ type: "CREATE_CARD_SUCCEEDED", categoryPath, date: date!, placement });
            }
            else {
                send({ type: "CREATE_CARD_CANCELLED" });
            }

            document.body.removeChild(ghostCard);
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