import { DailyboardMetrics } from "../types/dailyboard.metrics";
import { LayoutMetrics } from "../../ui-layout/types/layout.metrics";
import { DailyboardRegistry } from "../types/dailyboard.registry";
import { getCardPixelRect, getDailyboardCardData } from "../utils/dom.utils";
import { getGridFromSection, getGridMeta, getSectionMeta } from "../../ui-layout/utils/dom.utils";

export const calculateDailyboardMetrics = (layoutMetrics: LayoutMetrics) : DailyboardMetrics => {
    return {
        layout: layoutMetrics
    }
}

export const applyDailyboardMetrics = (registry: DailyboardRegistry, metrics: DailyboardMetrics) => {
    const sections = registry.layoutRegistry.getLayoutSections();

    sections?.forEach(section => {
        if(!section.props?.data?.id) return;

        const sectionEl = section.ref?.current;
        if (!sectionEl) return;

        const gridEl = getGridFromSection(sectionEl);
        if (!gridEl) return;

        const gridData = getGridMeta(gridEl);
        if (!gridData) return;

        const gridRect = gridEl.getBoundingClientRect();

        const cards = registry.getDailyboardCardsForSection(section.props?.data.id);

        cards?.forEach(card => {
            const cardEl = card.ref?.current;
            if (!cardEl) return;

            const data = getDailyboardCardData(cardEl);
            if (!data) return;

            const cardRect = getCardPixelRect(gridRect, 8, gridData.sectionSize, data);

            cardEl.style.left = `${cardRect.x}px`;
            cardEl.style.top = `${cardRect.y}px`;
            cardEl.style.width = `${cardRect.width}px`;
            cardEl.style.height = `${cardRect.height}px`;
        });
    });
}