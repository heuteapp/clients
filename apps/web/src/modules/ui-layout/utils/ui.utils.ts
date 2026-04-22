import { StoredLayoutData } from "@/src/heute-store/types/layout.types"

export const getCanvasDataSet = (canvas: StoredLayoutData) => {
    return {
        "data-layout": true,
        "data-name": canvas.name,
        "data-version": canvas.version,
        "data-col-count": canvas.colCount,
        "data-row-count": canvas.rowCount,
    }
}