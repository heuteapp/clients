import { StoredBoardCardModel, StoredBoardModel } from "@/src/heute-store/types/board.types";

export const getBoardDataSet = (board: StoredBoardModel) => {
    return {
        "data-board": true,
        "data-category-path": board.categoryPath,
        "data-canvas-name": board.canvasName,
        "data-canvas-version": board.canvasVersion,
        "data-date": board.date,
    }
}

export const getBoardCardContainerDataSet = () => {
    return {
        "data-board-card-container": true
    }
}

export const getBoardCardDataSet = (card: StoredBoardCardModel) => {
    return {
        "data-board-card": true,
        "data-id": card.id,
        "data-key": card.name,
        "data-title": card.content.title,
        "data-color": card.content.color,
        "data-grid-name": card.placement?.gridName || "",
        "data-col-index": card.placement?.position.colIndex || 0,
        "data-row-index": card.placement?.position.rowIndex || 0,
        "data-col-span": card.placement?.position.colSpan || 1,
        "data-row-span": card.placement?.position.rowSpan || 1,
    }
}