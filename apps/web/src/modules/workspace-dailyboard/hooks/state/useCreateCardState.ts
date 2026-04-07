import { useEffect } from "react";
import { isCreatingCard } from "../../state/workspace-dailyboard.machine";
import { useWorkspaceDailyboardContext } from "../useWorkspaceDailyboardContext";
import { useLayoutContext } from "@/src/modules/ui-layout/hooks/useLayoutContext";
import { GridRect, GridSize, Rect } from "@/src/modules/shared/types/common";

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
        const cardUnit = { colSpan: 6, rowSpan: 4 };

        let gridEl : HTMLDivElement | null = null;
        let ghostCardPos : Rect | null = null;

        const calculatePosition = (clientX: number, clientY: number) => {
            const size = {
                width: ((metrics.cellSize.grid || 0) * cardUnit.colSpan),
                height: ((metrics.cellSize.grid || 0) * cardUnit.rowSpan)
            }

            gridEl = findGrid(clientX, clientY);
            if(gridEl) {
                const gridRect = gridEl.getBoundingClientRect();
                const cellSize = metrics.cellSize.grid || 0;

                const { sectionSize } = getGridMeta(gridEl);
                const { col: mouseCol, row: mouseRow } = calcMouseIndex(clientX, clientY, gridRect, cellSize);
                let { col: cardCol, row: cardRow } = calcCardIndex(mouseCol, mouseRow, sectionSize, cardUnit);

                const cardPos = { colIndex: cardCol, rowIndex: cardRow, colSpan: cardUnit.colSpan, rowSpan: cardUnit.rowSpan };

                const gap = gridRect.width * 0.005;
                ghostCardPos = calcCardPos(gridRect, gap, sectionSize, cardPos);
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
                document.body.removeChild(ghostCard);
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

    const sectionSize = {
        colSpan: totalCols,
        rowSpan: totalRows
    };
    
    return { sectionSize };
}

const calcMouseIndex = (clientX: number, clientY: number, gridRect: DOMRect, cellSize: number) => {
    const col = Math.floor((clientX - gridRect.left) / cellSize);
    const row = Math.floor((clientY - gridRect.top) / cellSize);
    return { col, row };
}

const calcCardIndex = (mouseCol: number, mouseRow: number, sectionSize: GridSize, cardSize: GridSize) => {
    let col = mouseCol - Math.floor(cardSize.colSpan / 2);
    let row = mouseRow - Math.floor(cardSize.rowSpan / 2);

    col = Math.max(0, Math.min(col, sectionSize.colSpan - cardSize.colSpan));
    row = Math.max(0, Math.min(row, sectionSize.rowSpan - cardSize.rowSpan));

    return { col, row };
}

const calcCardPos = (gridRect: DOMRect, gap: number, sectionSize: GridSize, cardPos: GridRect) => {

    const localGridRect = {
        left: (gridRect.left) + gap,
        top: (gridRect.top) + gap,
        width: gridRect.width - gap * 2,
        height: gridRect.height - gap * 2
    }

    const stepSize = {
        width: localGridRect.width / sectionSize.colSpan,
        height: localGridRect.height / sectionSize.rowSpan
    }

    const rawPosition = {
        left: localGridRect.left + (cardPos.colIndex) * stepSize.width,
        top: localGridRect.top + (cardPos.rowIndex) * stepSize.height,
        width: cardPos.colSpan * stepSize.width,
        height: cardPos.rowSpan * stepSize.height,
    }

    return {
        x: rawPosition.left + gap,
        y: rawPosition.top + gap,
        width: rawPosition.width - gap * 2,
        height: rawPosition.height - gap * 2
    }
}