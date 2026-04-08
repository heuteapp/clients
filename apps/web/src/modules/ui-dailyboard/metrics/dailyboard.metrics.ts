import { ApplyDailyboardMetrics, CalculateDailyboardMetrics, DailyboardMetrics } from "../types/dailyboard.metrics";
import { getCardPixelRect, getDailyboardCardData } from "../utils/dom.utils";
import { findGridInSubtree, getSectionDataForGrid } from "../../ui-layout/utils/dom.utils";

export const calculateDailyboardMetrics = ({ layout } : CalculateDailyboardMetrics) : DailyboardMetrics => {
    return {
        layout
    }
}

export const applyDailyboardMetrics = ({ registry } : ApplyDailyboardMetrics) => {
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

            const cardRect = getCardPixelRect(gridRect, 8, gridData.position, data);

            cardEl.style.left = `${cardRect.x}px`;
            cardEl.style.top = `${cardRect.y}px`;
            cardEl.style.width = `${cardRect.width}px`;
            cardEl.style.height = `${cardRect.height}px`;
        });
    });
}