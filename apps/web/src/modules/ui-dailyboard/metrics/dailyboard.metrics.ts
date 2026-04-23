import { ApplyDailyboardMetrics, CalculateDailyboardMetrics, DailyboardMetricsValue } from "../types/dailyboard.metrics";
import { calcDailyboardCardFixedRect, findDailyboardCardTitleInSubtree, getDailyboardCardData } from "../utils/dom.utils";
import { findCanvasGridInSubtree, getGridData } from "../../ui-canvas/utils/dom.utils";

export const calculateDailyboardMetrics = ({ canvas } : CalculateDailyboardMetrics) : DailyboardMetricsValue | null => {
    if(!canvas) return null;

    const cardSize = {
        headerHeight: canvas.cellSize.grid * 1,
    }

    return {
        canvas,
        cardSize
    }
}

export const applyDailyboardMetrics = ({ metrics, registry } : ApplyDailyboardMetrics) => {
    const dailyboardEl = registry.dailyboard.ref?.current;
    if (!dailyboardEl) return;

    const sections = registry.canvasRegistry.getCanvasGridSections();

    sections?.forEach(section => {
        if(!section.props?.data?.id) return;

        const sectionEl = section.ref?.current;
        if (!sectionEl) return;

        const gridEl = findCanvasGridInSubtree(sectionEl);
        if (!gridEl) return;

        const gridData = getGridData(gridEl);
        if (!gridData) return;

        const gridRect = gridEl.getBoundingClientRect();

        const cards = registry.getDailyboardCardsForGrid(section.props?.data.id);

        cards?.forEach(card => {
            const cardEl = card.ref?.current;
            if (!cardEl) return;

            const data = getDailyboardCardData(cardEl);
            if (!data) return;

            const cardHeaderEl = findDailyboardCardTitleInSubtree(cardEl);
            if(cardHeaderEl) {
                const headerHeight = metrics.value?.cardSize.headerHeight || 0;
                cardHeaderEl.style.height = `${headerHeight}px`;
            }

            const { clientWidth: cardWidth } = dailyboardEl;

            const cardRect = calcDailyboardCardFixedRect(gridRect, cardWidth * 0.0075, gridData.position, data.placement!.position);

            cardEl.style.left = `${cardRect.x}px`;
            cardEl.style.top = `${cardRect.y}px`;
            cardEl.style.width = `${cardRect.width}px`;
            cardEl.style.height = `${cardRect.height}px`;
        });
    });
}