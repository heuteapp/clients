import { GridRect, GridSize } from "../../shared/types/common";

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