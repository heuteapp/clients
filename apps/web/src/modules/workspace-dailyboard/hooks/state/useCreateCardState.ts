import { useEffect } from "react";
import { isCreatingCard } from "../../state/workspace-dailyboard.machine";
import { useWorkspaceDailyboardContext } from "../useWorkspaceDailyboardContext";
import { useLayoutContext } from "@/src/modules/ui-layout/hooks/useLayoutContext";
import { parse } from "path";

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

        document.body.appendChild(ghostCard);
        const cardUnit = { col: 6, row: 4 };

        let gridEl : HTMLDivElement | null = null;

        const calculatePosition = (clientX: number, clientY: number) => {
            const size = {
                width: ((metrics.cellSize.grid || 0) * cardUnit.col),
                height: ((metrics.cellSize.grid || 0) * cardUnit.row)
            }

            let cellPos = {
                x: clientX - (size.width / 2),
                y: clientY - (size.height / 2),
                width: size.width,
                height: size.height
            };

            gridEl = findGrid(clientX, clientY);
            if(gridEl) {
                const gridRect = gridEl.getBoundingClientRect();
                const cellSize = metrics.cellSize.grid || 0;

                const { totalCols, totalRows } = getGridMeta(gridEl);
                const { col: mouseCol, row: mouseRow } = calcMouseIndex(clientX, clientY, gridRect, cellSize);
                let { col: cardCol, row: cardRow } = calcCardIndex(mouseCol, mouseRow, cardUnit.col, cardUnit.row, totalCols, totalRows);

                const gap = gridRect.width * 0.005; // 2% gap

                const localGridRect = {
                    left: (gridRect.left) + gap,
                    top: (gridRect.top) + gap,
                    width: gridRect.width - gap * 2,
                    height: gridRect.height - gap * 2
                }

                const stepSize = {
                    width: localGridRect.width / totalCols,
                    height: localGridRect.height / totalRows
                }

                const rawPosition = {
                    left: localGridRect.left + (cardCol) * stepSize.width,
                    top: localGridRect.top + (cardRow) * stepSize.height,
                    width: cardUnit.col * stepSize.width,
                    height: cardUnit.row * stepSize.height,
                }

                const position = {
                    left: rawPosition.left + gap,
                    top: rawPosition.top + gap,
                    width: rawPosition.width - gap * 2,
                    height: rawPosition.height - gap * 2
                }

                cellPos = {
                    x: position.left,
                    y: position.top,
                    width: position.width,
                    height: position.height
                };
            }

            return cellPos;
        };

        const updateGhostCard = (clientX: number, clientY: number) => {
            if(!ghostCard) return;
            const pos = calculatePosition(clientX, clientY);
            
            ghostCard.style.left = `${pos.x}px`;
            ghostCard.style.top = `${pos.y}px`;
            ghostCard.style.width = `${pos.width}px`;
            ghostCard.style.height = `${pos.height}px`;
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

const getGridMeta = (gridEl: HTMLDivElement) => {
    const totalCols = parseInt(gridEl.dataset.layoutGridColspan || "0", 10);
    const totalRows = parseInt(gridEl.dataset.layoutGridRowspan || "0", 10);
    return { totalCols, totalRows };
}

const calcMouseIndex = (clientX: number, clientY: number, gridRect: DOMRect, cellSize: number) => {
    const col = Math.floor((clientX - gridRect.left) / cellSize);
    const row = Math.floor((clientY - gridRect.top) / cellSize);
    return { col, row };
}

const calcCardIndex = (mouseCol: number, mouseRow: number, colSpan: number, rowSpan: number, totalCols: number, totalRows: number) => {
    let col = mouseCol - Math.floor(colSpan / 2);
    let row = mouseRow - Math.floor(rowSpan / 2);

    col = Math.max(0, Math.min(col, totalCols - colSpan));
    row = Math.max(0, Math.min(row, totalRows - rowSpan));

    return { col, row };
}