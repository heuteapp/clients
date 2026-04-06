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

        const handleMouseMove = (event: MouseEvent) => {
            const cardSize = { 
                width: (metrics.cellSize.grid || 0) * cardUnit.col,
                height: (metrics.cellSize.grid || 0) * cardUnit.row
            }

            let cellPos = {
                x: event.clientX - (cardSize.width / 2),
                y: event.clientY - (cardSize.height / 2)
            }

            const gridEl = findGridUnderMouse(event);
            if(gridEl) {
                const gridRect = gridEl.getBoundingClientRect();
                const cellSize = metrics.cellSize.grid || 0;

                const totalCols = Math.round(gridRect.width / cellSize);
                const totalRows = Math.round(gridRect.height / cellSize);
                
                const mouseCol0 = Math.floor((event.clientX - gridRect.left) / cellSize);
                const mouseRow0 = Math.floor((event.clientY - gridRect.top) / cellSize);

                let targetCol0 = mouseCol0 - Math.floor(cardUnit.col / 2);
                let targetRow0 = mouseRow0 - Math.floor(cardUnit.row / 2);

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

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", () => {
            window.removeEventListener("mousemove", handleMouseMove);
            send({ type: "CREATE_CARD_CANCELLED" });
        }, { once: true });

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }
}

const findGridUnderMouse = (event: MouseEvent) => {
    const element = document.elementFromPoint(event.clientX, event.clientY);
    if(element) {
        const grid = element.closest("[data-layout-grid-id]");

        if(grid) {
            return grid;
        }
    }
    return null;
}