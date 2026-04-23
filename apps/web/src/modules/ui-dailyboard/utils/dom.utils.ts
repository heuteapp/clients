import { DailyboardCardModelData, DailyboardModelData } from "../../dailyboard/types/dailyboard.model.types";
import { GridRect, GridSpan } from "../../shared/types/common";
import { parseYYMMDD } from "../../shared/utils/date.utils";

export const findDailyboardInSubtree = (el: Element): HTMLDivElement | null => {
    const child = el.querySelector<HTMLDivElement>("[data-dailyboard]");
    return child || null;
}

export const findDailyboardClosest = (el: Element): HTMLDivElement | null => {
    const parent = el.closest<HTMLDivElement>("[data-dailyboard]");
    return parent || null;
}

export const findDailyboardAtCursor = (clientX: number, clientY: number): HTMLDivElement | null => {
    const allElements = document.elementsFromPoint(clientX, clientY);
    
    for (const element of allElements) {
        const dailyboard = (element as HTMLElement).closest<HTMLDivElement>("[data-dailyboard]");
        if (dailyboard) return dailyboard;
    }
    
    return null;
}

export const getDailyboardData = (dailyboardEl: HTMLElement) : DailyboardModelData => {
    return {
        categoryPath: dailyboardEl.dataset.categoryPath || "",
        canvasName: dailyboardEl.dataset.canvasName || "",
        canvasVersion: parseInt(dailyboardEl.dataset.canvasVersion || "0", 10),
        date: parseYYMMDD(dailyboardEl.dataset.date || "")!
    }
}

//

export const findDailyboardCardInSubtree = (el: Element): HTMLDivElement | null => {
    const child = el.querySelector<HTMLDivElement>("[data-dailyboard-card]");
    return child || null;
}

export const findDailyboardCardClosest = (el: Element): HTMLDivElement | null => {
    const parent = el.closest<HTMLDivElement>("[data-dailyboard-card]");
    return parent || null;
}

export const findDailyboardCardAtCursor = (clientX: number, clientY: number): HTMLDivElement | null => {
    const allElements = document.elementsFromPoint(clientX, clientY);
    
    for (const element of allElements) {
        const card = (element as HTMLElement).closest<HTMLDivElement>("[data-dailyboard-card]");
        if (card) return card;
    }
    
    return null;
}

export const findDailyboardCardForKey = (key: string): HTMLDivElement | null => {
    return findDailyboardInSubtree(document.body)?.querySelector<HTMLDivElement>(`[data-dailyboard-card][data-key="${key}"]`) || null;
}

//

export const findDailyboardCardTitleInSubtree = (el: Element): HTMLDivElement | null => {
    return findDailyboardInSubtree(el)?.querySelector<HTMLDivElement>("[data-title]") || null;
}

export const findDailyboardCardTitleClosest = (el: Element): HTMLDivElement | null => {
    return findDailyboardCardClosest(el)?.querySelector<HTMLDivElement>("[data-title]") || null;
}

export const findDailyboardCardTitleAtCursor = (clientX: number, clientY: number): HTMLDivElement | null => {
    return findDailyboardCardAtCursor(clientX, clientY)?.querySelector<HTMLDivElement>("[data-title]") || null;
}

//

export const findAllDailyboardCards = (dailyboardEl: HTMLDivElement) => {
    const cardElements = dailyboardEl.querySelectorAll(`[data-dailyboard-card]`);
    return Array.from(cardElements) as HTMLDivElement[];
}

export const findAllDailyboardCardsForGrid = (dailyboardEl: HTMLDivElement, gridName: string) => {
    const cardElements = dailyboardEl.querySelectorAll(`[data-dailyboard-card][data-grid-name="${gridName}"]`);
    return Array.from(cardElements) as HTMLDivElement[];
}

//

export const getDailyboardCardData = (cardEl: HTMLElement) : DailyboardCardModelData => {
    return {
        name: cardEl.dataset.name || "",
        content: null!,
        placement: {
            gridName: cardEl.dataset.gridName || "",
            position: {
                colIndex: parseInt(cardEl.dataset.colIndex || "0", 10),
                rowIndex: parseInt(cardEl.dataset.rowIndex || "0", 10),
                colSpan: parseInt(cardEl.dataset.colSpan || "1", 10),
                rowSpan: parseInt(cardEl.dataset.rowSpan || "1", 10)
            }
        }
    };
}

//

export const calcDailyboardCardGridIndexes = (mouseCol: number, mouseRow: number, gridSize: GridSpan, cardSize: GridSpan) => {
    let col = mouseCol - Math.floor(cardSize.colSpan / 2);
    let row = mouseRow - Math.floor(cardSize.rowSpan / 2);

    col = Math.max(1, Math.min(col, gridSize.colSpan - cardSize.colSpan + 1));
    row = Math.max(1, Math.min(row, gridSize.rowSpan - cardSize.rowSpan + 1));

    return { col, row };
}

export const calcDailyboardCardFixedRect = (gridRect: DOMRect, gap: number, gridSize: GridSpan, cardPos: GridRect) => {

    const localGridRect = {
        left: (gridRect.left) + gap,
        top: (gridRect.top) + gap,
        width: gridRect.width - gap * 2,
        height: gridRect.height - gap * 2
    }

    const stepSize = {
        width: localGridRect.width / gridSize.colSpan,
        height: localGridRect.height / gridSize.rowSpan
    }

    const rawPosition = {
        left: localGridRect.left + (cardPos.colIndex - 1) * stepSize.width,
        top: localGridRect.top + (cardPos.rowIndex - 1) * stepSize.height,
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