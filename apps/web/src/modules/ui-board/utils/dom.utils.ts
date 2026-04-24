import { BoardCardModelData, BoardModelData } from "../../d-board/types/board.model.types";
import { GridRect, GridSpan } from "../../d-shared/types/common";
import { parseYYMMDD } from "../../d-shared/utils/date.utils";

export const findBoardInSubtree = (el: Element): HTMLDivElement | null => {
    const child = el.querySelector<HTMLDivElement>("[data-board]");
    return child || null;
}

export const findBoardClosest = (el: Element): HTMLDivElement | null => {
    const parent = el.closest<HTMLDivElement>("[data-board]");
    return parent || null;
}

export const findBoardAtCursor = (clientX: number, clientY: number): HTMLDivElement | null => {
    const allElements = document.elementsFromPoint(clientX, clientY);
    
    for (const element of allElements) {
        const board = (element as HTMLElement).closest<HTMLDivElement>("[data-board]");
        if (board) return board;
    }
    
    return null;
}

export const getBoardData = (boardEl: HTMLElement) : BoardModelData => {
    return {
        categoryPath: boardEl.dataset.categoryPath || "",
        canvasName: boardEl.dataset.canvasName || "",
        canvasVersion: parseInt(boardEl.dataset.canvasVersion || "0", 10),
        date: parseYYMMDD(boardEl.dataset.date || "")!
    }
}

//

export const findBoardCardInSubtree = (el: Element): HTMLDivElement | null => {
    const child = el.querySelector<HTMLDivElement>("[data-board-card]");
    return child || null;
}

export const findBoardCardClosest = (el: Element): HTMLDivElement | null => {
    const parent = el.closest<HTMLDivElement>("[data-board-card]");
    return parent || null;
}

export const findBoardCardAtCursor = (clientX: number, clientY: number): HTMLDivElement | null => {
    const allElements = document.elementsFromPoint(clientX, clientY);
    
    for (const element of allElements) {
        const card = (element as HTMLElement).closest<HTMLDivElement>("[data-board-card]");
        if (card) return card;
    }
    
    return null;
}

export const findBoardCardForKey = (key: string): HTMLDivElement | null => {
    return findBoardInSubtree(document.body)?.querySelector<HTMLDivElement>(`[data-board-card][data-key="${key}"]`) || null;
}

//

export const findBoardCardTitleInSubtree = (el: Element): HTMLDivElement | null => {
    return findBoardInSubtree(el)?.querySelector<HTMLDivElement>("[data-title]") || null;
}

export const findBoardCardTitleClosest = (el: Element): HTMLDivElement | null => {
    return findBoardCardClosest(el)?.querySelector<HTMLDivElement>("[data-title]") || null;
}

export const findBoardCardTitleAtCursor = (clientX: number, clientY: number): HTMLDivElement | null => {
    return findBoardCardAtCursor(clientX, clientY)?.querySelector<HTMLDivElement>("[data-title]") || null;
}

//

export const findAllBoardCards = (boardEl: HTMLDivElement) => {
    const cardElements = boardEl.querySelectorAll(`[data-board-card]`);
    return Array.from(cardElements) as HTMLDivElement[];
}

export const findAllBoardCardsForGrid = (boardEl: HTMLDivElement, gridName: string) => {
    const cardElements = boardEl.querySelectorAll(`[data-board-card][data-grid-name="${gridName}"]`);
    return Array.from(cardElements) as HTMLDivElement[];
}

//

export const getBoardCardData = (cardEl: HTMLElement) : BoardCardModelData => {
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

export const calcBoardCardGridIndexes = (mouseCol: number, mouseRow: number, gridSize: GridSpan, cardSize: GridSpan) => {
    let col = mouseCol - Math.floor(cardSize.colSpan / 2);
    let row = mouseRow - Math.floor(cardSize.rowSpan / 2);

    col = Math.max(1, Math.min(col, gridSize.colSpan - cardSize.colSpan + 1));
    row = Math.max(1, Math.min(row, gridSize.rowSpan - cardSize.rowSpan + 1));

    return { col, row };
}

export const calcBoardCardFixedRect = (gridRect: DOMRect, gap: number, gridSize: GridSpan, cardPos: GridRect) => {

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