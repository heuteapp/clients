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
        const ghostCard = document.createElement("div");
        ghostCard.id = "dailyboard-ghost-card";
        ghostCard.style.position = "fixed";
        ghostCard.style.pointerEvents = "none";
        ghostCard.style.zIndex = "1000";
        ghostCard.style.border = "2px dashed #206eff";
        ghostCard.style.borderRadius = "8px";
        ghostCard.style.boxSizing = 'border-box';

        document.body.appendChild(ghostCard);
        const cardUnit = { col: 6, row: 4 };

        let gridEl : HTMLDivElement | null = null;

        const getCardSize = () => ({
            width: ((metrics.cellSize.grid || 0) * cardUnit.col) - 16,
            height: ((metrics.cellSize.grid || 0) * cardUnit.row) - 16
        });

        const calculatePosition = (clientX: number, clientY: number) => {
            const cardSize = getCardSize();
            let cellPos = {
                x: clientX - (cardSize.width / 2),
                y: clientY - (cardSize.height / 2)
            };

            gridEl = findGrid(clientX, clientY);
            if(gridEl) {
                const gridRect = gridEl.getBoundingClientRect();
                const cellSize = metrics.cellSize.grid || 0;
                const totalCols = Math.round(gridRect.width / cellSize);
                const totalRows = Math.round(gridRect.height / cellSize);
                
                const col0 = Math.floor((clientX - gridRect.left) / cellSize);
                const row0 = Math.floor((clientY - gridRect.top) / cellSize);

                let targetCol0 = col0 - Math.floor(cardUnit.col / 2);
                let targetRow0 = row0 - Math.floor(cardUnit.row / 2);

                targetCol0 = Math.max(0, Math.min(targetCol0, totalCols - cardUnit.col));
                targetRow0 = Math.max(0, Math.min(targetRow0, totalRows - cardUnit.row));

                cellPos = {
                    x: gridRect.left + (targetCol0 * cellSize) + 8,
                    y: gridRect.top + (targetRow0 * cellSize) + 8
                };
            }

            return cellPos;
        };

        const updateGhostCard = (clientX: number, clientY: number) => {
            if(!ghostCard) return;
            const cardSize = getCardSize();
            const pos = calculatePosition(clientX, clientY);
            
            ghostCard.style.left = `${pos.x}px`;
            ghostCard.style.top = `${pos.y}px`;
            ghostCard.style.width = `${cardSize.width}px`;
            ghostCard.style.height = `${cardSize.height}px`;
        };

        const handleMove = (clientX: number, clientY: number) => {
            updateGhostCard(clientX, clientY);
        };

        const handleEnd = () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", onTouchEnd);

            if(gridEl) {
                send({ type: "CREATE_CARD_SUCCEEDED" });
            }
            else {
                send({ type: "CREATE_CARD_CANCELLED" });
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

const findGrid = (clientX: number, clientY: number): HTMLDivElement | null => {
    const element = document.elementFromPoint(clientX, clientY);
    return element?.closest<HTMLDivElement>("[data-layout-grid]") || null;
}