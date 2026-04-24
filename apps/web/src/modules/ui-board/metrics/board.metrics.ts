import { ApplyBoardMetrics, CalculateBoardMetrics, BoardMetricsValue } from "../types/board.metrics";
import { calcBoardCardFixedRect, findBoardCardTitleInSubtree, getBoardCardData } from "../utils/dom.utils";
import { findCanvasGridInSubtree, getCanvasGridModelData } from "../../ui-canvas/utils/dom.utils";

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

export const applyBoardMetrics = ({ metrics, registry } : ApplyBoardMetrics) => {
    const boardEl = registry.board.ref?.current;
    if (!boardEl) return;

    const sections = registry.canvasRegistry.getCanvasGridSections();

    sections?.forEach(section => {
        if(!section.props?.data?.id) return;

        const sectionEl = section.ref?.current;
        if (!sectionEl) return;

        const gridEl = findCanvasGridInSubtree(sectionEl);
        if (!gridEl) return;

        const gridData = getCanvasGridModelData(gridEl);
        if (!gridData) return;

        const gridRect = gridEl.getBoundingClientRect();

        const cards = registry.getBoardCardsForGrid(section.props?.data.id);

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