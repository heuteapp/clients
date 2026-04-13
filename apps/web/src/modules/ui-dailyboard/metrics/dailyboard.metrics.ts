import { ApplyDailyboardMetrics, CalculateDailyboardMetrics, DailyboardMetricsValue } from "../types/dailyboard.metrics";
import { calcDailyboardCardFixedRect, getDailyboardCardData } from "../utils/dom.utils";
import { findGridInSubtree, getSectionDataForGrid } from "../../ui-layout/utils/dom.utils";

export const calculateDailyboardMetrics = ({ layout } : CalculateDailyboardMetrics) : DailyboardMetricsValue | null => {
    const layoutValue = layout.value;
    if(!layoutValue) return null;

    const cardSize = {
        headerHeight: layoutValue.cellSize.grid * 0.5,
    }

    return {
        layout,
        cardSize
    }
}

export const applyDailyboardMetrics = ({ registry } : ApplyDailyboardMetrics) => {
    const dailyboardEl = registry.dailyboard.ref?.current;
    if (!dailyboardEl) return;

    const sections = registry.layoutRegistry.getLayoutSections();

    sections?.forEach(section => {
        if(!section.props?.data?.id) return;

        const sectionEl = section.ref?.current;
        if (!sectionEl) return;

        const gridEl = findGridInSubtree(sectionEl);
        if (!gridEl) return;

        const gridData = getSectionDataForGrid(gridEl);
        if (!gridData) return;

        const gridRect = gridEl.getBoundingClientRect();

        const cards = registry.getDailyboardCardsForSection(section.props?.data.id);

        cards?.forEach(card => {
            const cardEl = card.ref?.current;
            if (!cardEl) return;

            const data = getDailyboardCardData(cardEl);
            if (!data) return;

            const { clientWidth: cardWidth } = dailyboardEl;

            const cardRect = calcDailyboardCardFixedRect(gridRect, cardWidth * 0.0075, gridData.position, data);

            cardEl.style.left = `${cardRect.x}px`;
            cardEl.style.top = `${cardRect.y}px`;
            cardEl.style.width = `${cardRect.width}px`;
            cardEl.style.height = `${cardRect.height}px`;
        });
    });
}