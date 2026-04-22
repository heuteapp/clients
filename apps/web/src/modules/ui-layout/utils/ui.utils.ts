import { StoredLayoutData, StoredLayoutSectionData } from "@/src/heute-store/types/layout.types"

export const getCanvasDataSet = (canvas: StoredLayoutData | null) => {
    if(!canvas) return null;
    
    return {
        "data-layout": true,
        "data-name": canvas.name,
        "data-version": canvas.version,
        "data-col-count": canvas.colCount,
        "data-row-count": canvas.rowCount,
    }
}

export const getCanvasGridDataSet = (section: StoredLayoutSectionData | null) => {
    if(!section) return null;

    return {
        "data-layout-grid": true,
        "data-name": section.name,
        "data-col-index": section.position.colIndex,
        "data-row-index": section.position.rowIndex,
        "data-col-span": section.position.colSpan,
        "data-row-span": section.position.rowSpan,
    }
}