import { GridRect, GridSize } from "../../shared/types/common";



export const getDailyboardClosest = (el: HTMLDivElement): HTMLDivElement | null => {
    const parent = el.closest<HTMLDivElement>("[data-dailyboard]");
    return parent || null;
}

//

export const getCardAnchorCell = (mouseCol: number, mouseRow: number, sectionSize: GridSize, cardSize: GridSize) => {
    let col = mouseCol - Math.floor(cardSize.colSpan / 2);
    let row = mouseRow - Math.floor(cardSize.rowSpan / 2);

    col = Math.max(0, Math.min(col, sectionSize.colSpan - cardSize.colSpan));
    row = Math.max(0, Math.min(row, sectionSize.rowSpan - cardSize.rowSpan));

    return { col, row };
}

export const getCardPixelRect = (gridRect: DOMRect, gap: number, sectionSize: GridSize, cardPos: GridRect) => {

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

//

export const getDailyboardCardData = (cardEl: HTMLElement) => {
    const colIndex = cardEl.dataset.dailyboardCardColIndex;
    const rowIndex = cardEl.dataset.dailyboardCardRowIndex;
    const colSpan = cardEl.dataset.dailyboardCardColSpan;
    const rowSpan = cardEl.dataset.dailyboardCardRowSpan;

    return {
        colIndex: colIndex ? parseInt(colIndex, 10) : 0,
        rowIndex: rowIndex ? parseInt(rowIndex, 10) : 0,
        colSpan: colSpan ? parseInt(colSpan, 10) : 0,
        rowSpan: rowSpan ? parseInt(rowSpan, 10) : 0
    };
}

export const getDailyboardCardsForSection = (dailyboardEl: HTMLDivElement, sectionName: string) => {
    const cardElements = dailyboardEl.querySelectorAll(`[data-dailyboard-card-section-name="${sectionName}"]`);
    return Array.from(cardElements) as HTMLDivElement[];
}