import { useEffect } from "react";
import { isCreatingCard } from "../../state/workspace-dailyboard.machine";
import { useWorkspaceDailyboardContext } from "../useWorkspaceDailyboardContext";
import { useLayoutContext } from "@/src/modules/ui-layout/hooks/useLayoutContext";

export const useCreateCardState = () => {
    const { send, state } = useWorkspaceDailyboardContext();
    const { metrics } = useLayoutContext();
    
    useEffect(() => {
        if(isCreatingCard(state)) {
            return useCreatingCard();
        }
    }, [state]);

    const useCreatingCard = () => {
        const ghostCard = document.getElementById("dailyboard-ghost-card");
        const cardUnit = { col: 6, row: 4 };

        const handleTouchMove = (event: TouchEvent) => {
            event.preventDefault();
            const touch = event.touches[0];
            if(!touch) return;

            const cardSize = { 
                width: (metrics.cellSize.grid || 0) * cardUnit.col,
                height: (metrics.cellSize.grid || 0) * cardUnit.row
            }

            let cellPos = {
                x: touch.clientX - (cardSize.width / 2),
                y: touch.clientY - (cardSize.height / 2)
            }

            const gridEl = findGridUnderTouch(touch);
            if(gridEl) {
                const gridRect = gridEl.getBoundingClientRect();
                const cellSize = metrics.cellSize.grid || 0;

                const totalCols = Math.round(gridRect.width / cellSize);
                const totalRows = Math.round(gridRect.height / cellSize);
                
                const touchCol0 = Math.floor((touch.clientX - gridRect.left) / cellSize);
                const touchRow0 = Math.floor((touch.clientY - gridRect.top) / cellSize);

                let targetCol0 = touchCol0 - Math.floor(cardUnit.col / 2);
                let targetRow0 = touchRow0 - Math.floor(cardUnit.row / 2);

                targetCol0 = Math.max(0, Math.min(targetCol0, totalCols - cardUnit.col));
                targetRow0 = Math.max(0, Math.min(targetRow0, totalRows - cardUnit.row));

                cellPos = {
                    x: gridRect.left + (targetCol0 * cellSize),
                    y: gridRect.top + (targetRow0 * cellSize)
                };
            }

            if(ghostCard) {
                ghostCard.style.left = `${cellPos.x}px`;
                ghostCard.style.top = `${cellPos.y}px`;
                ghostCard.style.width = `${cardSize.width}px`;
                ghostCard.style.height = `${cardSize.height}px`;
            }
        };

        const handleTouchEnd = () => {
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
            send({ type: "CREATE_CARD_CANCELLED" });
        };

        window.addEventListener("touchmove", handleTouchMove, { passive: false });
        window.addEventListener("touchend", handleTouchEnd);

        return () => {
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }
}

const findGridUnderTouch = (touch: Touch) => {
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if(element) {
        const grid = element.closest("[data-layout-grid-id]");
        if(grid) {
            return grid;
        }
    }
    return null;
}