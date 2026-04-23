import { StoredCanvasData, StoredCanvasSectionData } from "@/src/heute-store/types/canvas.types"

export const getCanvasDataSet = (canvas: StoredCanvasData | null) => {
    if(!canvas) return null;
    
    return {
        "data-canvas": true,
        "data-name": canvas.name,
        "data-version": canvas.version,
        "data-col-count": canvas.colCount,
        "data-row-count": canvas.rowCount,
    }
}

export const getCanvasGridDataSet = (section: StoredCanvasSectionData | null) => {
    if(!section) return null;

    return {
        "data-canvas-grid": true,
        "data-name": section.name,
        "data-col-index": section.position.colIndex,
        "data-row-index": section.position.rowIndex,
        "data-col-span": section.position.colSpan,
        "data-row-span": section.position.rowSpan,
    }
}