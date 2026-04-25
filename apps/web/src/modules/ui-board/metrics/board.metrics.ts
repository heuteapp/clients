import { ApplyBoardMetrics, CalculateBoardMetrics, BoardMetricsValue } from "../types/board.metrics";
import { calcBoardCardFixedRect, findBoardCardTitleInSubtree, getBoardCardData } from "../utils/dom.utils";
import { CanvasGridModelData } from "../../d-canvas/types/canvas.model.types";
import { BoardCardModelData } from "../../d-board/types/board.model.types";

export const calculateBoardMetrics = ({ canvas } : CalculateBoardMetrics) : BoardMetricsValue | null => {
    if(!canvas) return null;

    const cardSize = {
        headerHeight: canvas.cellSize.grid * 1,
    }

    return {
        canvas,
        cardSize
    }
}

export const applyBoardMetrics = ({ metrics, selector } : ApplyBoardMetrics) => {
    const boardEl = selector.uniqueItem("board-root")?.ref?.current;
    if (!boardEl) return;

    const grids = selector.itemsByType("canvas-grid-item");

    grids?.forEach(grid => {
        if(!grid.data?.id) return;

        const gridEl = grid.ref?.current;
        if (!gridEl) return;

        const gridData = grid.data as CanvasGridModelData;
        if (!gridData) return;

        const gridRect = gridEl.getBoundingClientRect();

        const cards = selector.itemsByType("board-card-item", (card) => {
            const cardData = card.data as BoardCardModelData;

            return cardData.placement?.gridName === gridData.name;
        });

        cards?.forEach(card => {
            const cardEl = card.ref?.current;
            if (!cardEl) return;

            const data = getBoardCardData(cardEl);
            if (!data) return;

            const cardHeaderEl = findBoardCardTitleInSubtree(cardEl);
            if(cardHeaderEl) {
                const headerHeight = metrics.value?.cardSize.headerHeight || 0;
                cardHeaderEl.style.height = `${headerHeight}px`;
            }

            const { clientWidth: cardWidth } = boardEl;

            const cardRect = calcBoardCardFixedRect(gridRect, cardWidth * 0.0075, gridData.position, data.placement!.position);

            cardEl.style.left = `${cardRect.x}px`;
            cardEl.style.top = `${cardRect.y}px`;
            cardEl.style.width = `${cardRect.width}px`;
            cardEl.style.height = `${cardRect.height}px`;
        });
    });
}