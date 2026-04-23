import { StoredDailyboardCardData, StoredDailyboardData } from "@/src/heute-store/types/dailyboard.types";

export const getDailyboardDataSet = (dailyboard: StoredDailyboardData) => {
    return {
        "data-dailyboard": true,
        "data-category-path": dailyboard.categoryPath,
        "data-canvas-name": dailyboard.canvasName,
        "data-canvas-version": dailyboard.canvasVersion,
        "data-date": dailyboard.date,
    }
}

export const getDailyboardCardContainerDataSet = () => {
    return {
        "data-dailyboard-card-container": true
    }
}

export const getDailyboardCardDataSet = (card: StoredDailyboardCardData) => {
    return {
        "data-dailyboard-card": true,
        "data-id": card.id,
        "data-key": card.name,
        "data-title": card.content.title,
        "data-color": card.content.color,
        "data-section-name": card.placement?.sectionName || "",
        "data-col-index": card.placement?.position.colIndex || 0,
        "data-row-index": card.placement?.position.rowIndex || 0,
        "data-col-span": card.placement?.position.colSpan || 1,
        "data-row-span": card.placement?.position.rowSpan || 1,
    }
}