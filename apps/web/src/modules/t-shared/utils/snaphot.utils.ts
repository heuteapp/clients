import { findAllCanvasGrids, findCanvasInSubtree, getCanvasData, getCanvasGridData } from "../../ui-layout/utils/dom.utils"
import { CanvasGridSnapshot, CanvasSnapshot } from "../types/snapshot.types";

export const getCanvasSnapshot = (el: Element = document.body) : CanvasSnapshot | null => {
    const canvasEl = findCanvasInSubtree(el as HTMLDivElement);
    if (!canvasEl) return null;

    const data = getCanvasData(canvasEl);
    if (!data) return null;

    const grids : CanvasGridSnapshot[] = findAllCanvasGrids(canvasEl).map(gridEl => {
        const gridData = getCanvasGridData(gridEl)!;

        return {
            rect: gridEl.getBoundingClientRect(),
            gridName: gridData.name,
            gridRect: gridData.position
        }
    });

    return {
        rect: canvasEl.getBoundingClientRect(),
        canvasName: data.name,
        canvasVersion: data.version,
        dimensions: {
            colCount: data.colCount,
            rowCount: data.rowCount
        },
        grids
    }
}