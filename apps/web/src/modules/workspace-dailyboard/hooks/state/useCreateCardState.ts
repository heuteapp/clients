import { useEffect } from "react";
import { isCreatingCard } from "../../state/workspace-dailyboard.machine";
import { useWorkspaceDailyboardContext } from "../useWorkspaceDailyboardContext";
import { useLayoutContext } from "@/src/modules/ui-layout/hooks/useLayoutContext";
import { Rect } from "@/src/modules/shared/types/common";
import { findGridElement, getCellAtCursor, getGridMeta } from "@/src/modules/ui-layout/utils/dom.utils";
import { getCardAnchorCell, getCardPixelRect } from "@/src/modules/ui-dailyboard/utils/dom.utils";

export const useCreateCardState = () => {
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
        const cardUnit = { colSpan: 6, rowSpan: 4 };

        let gridEl : HTMLDivElement | null = null;
        let ghostCardPos : Rect | null = null;

        const calculatePosition = (clientX: number, clientY: number) => {
            const size = {
                width: ((metrics.cellSize.grid || 0) * cardUnit.colSpan),
                height: ((metrics.cellSize.grid || 0) * cardUnit.rowSpan)
            }

            gridEl = findGridElement(clientX, clientY);
            if(gridEl) {
                const gridRect = gridEl.getBoundingClientRect();
                const cellSize = metrics.cellSize.grid || 0;

                const { sectionSize } = getGridMeta(gridEl);
                const { col: mouseCol, row: mouseRow } = getCellAtCursor({ x: clientX, y: clientY }, gridRect, cellSize);
                let { col: cardCol, row: cardRow } = getCardAnchorCell(mouseCol, mouseRow, sectionSize, cardUnit);

                const cardPos = { colIndex: cardCol, rowIndex: cardRow, colSpan: cardUnit.colSpan, rowSpan: cardUnit.rowSpan };

                const gap = gridRect.width * 0.005;
                ghostCardPos = getCardPixelRect(gridRect, gap, sectionSize, cardPos);
            }
            else {
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

            if(gridEl && ghostCardPos) {
                send({ type: "CREATE_CARD_SUCCEEDED", position: ghostCardPos });
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