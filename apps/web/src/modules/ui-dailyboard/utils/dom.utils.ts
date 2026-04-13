import { GridRect, GridSize } from "../../shared/types/common";

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

export const findDailyboardCardHeaderInSubtree = (el: Element): HTMLDivElement | null => {
    const child = el.querySelector<HTMLDivElement>("[data-dailyboard-card-header]");
    return child || null;
}

export const findDailyboardCardHeaderClosest = (el: Element): HTMLDivElement | null => {
    const parent = el.closest<HTMLDivElement>("[data-dailyboard-card-header]");
    return parent || null;
}

export const findDailyboardCardHeaderAtCursor = (clientX: number, clientY: number): HTMLDivElement | null => {
    const allElements = document.elementsFromPoint(clientX, clientY);
    
    for (const element of allElements) {
        const header = (element as HTMLElement).closest<HTMLDivElement>("[data-dailyboard-card-header]");
        if (header) return header;
    }
    
    return null;
}

//

export const findDailyboardCardsForSection = (dailyboardEl: HTMLDivElement, sectionName: string) => {
    const cardElements = dailyboardEl.querySelectorAll(`[data-dailyboard-card-section-name="${sectionName}"]`);
    return Array.from(cardElements) as HTMLDivElement[];
}

//

export const getDailyboardCardData = (cardEl: HTMLElement) => {
    const key = cardEl.dataset.dailyboardCardKey;
    const colIndex = cardEl.dataset.dailyboardCardColIndex;
    const rowIndex = cardEl.dataset.dailyboardCardRowIndex;
    const colSpan = cardEl.dataset.dailyboardCardColSpan;
    const rowSpan = cardEl.dataset.dailyboardCardRowSpan;

    return {
        key: key || "",
        colIndex: colIndex ? parseInt(colIndex, 10) : 0,
        rowIndex: rowIndex ? parseInt(rowIndex, 10) : 0,
        colSpan: colSpan ? parseInt(colSpan, 10) : 0,
        rowSpan: rowSpan ? parseInt(rowSpan, 10) : 0
    };
}

//

export const calcDailyboardCardGridIndexes = (mouseCol: number, mouseRow: number, sectionSize: GridSize, cardSize: GridSize) => {
    let col = mouseCol - Math.floor(cardSize.colSpan / 2);
    let row = mouseRow - Math.floor(cardSize.rowSpan / 2);

    col = Math.max(1, Math.min(col, sectionSize.colSpan - cardSize.colSpan + 1));
    row = Math.max(1, Math.min(row, sectionSize.rowSpan - cardSize.rowSpan + 1));

    return { col, row };
}

export const calcDailyboardCardFixedRect = (gridRect: DOMRect, gap: number, sectionSize: GridSize, cardPos: GridRect) => {

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