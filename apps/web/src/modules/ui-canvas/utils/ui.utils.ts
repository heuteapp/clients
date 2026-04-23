import { StoredCanvasModel, StoredCanvasGridModel } from "@/src/heute-store/types/canvas.types"

export const getCanvasDataSet = (canvas: StoredCanvasModel | null) => {
    if(!canvas) return null;
    
    return {
        "data-canvas": true,
        "data-name": canvas.name,
        "data-version": canvas.version,
        "data-col-count": canvas.colCount,
        "data-row-count": canvas.rowCount,
    }
}

export const getCanvasGridDataSet = (grid: StoredCanvasGridModel | null) => {
    if(!grid) return null;

    return {
        "data-canvas-grid": true,
        "data-name": grid.name,
        "data-col-index": grid.position.colIndex,
        "data-row-index": grid.position.rowIndex,
        "data-col-span": grid.position.colSpan,
        "data-row-span": grid.position.rowSpan,
    }
}