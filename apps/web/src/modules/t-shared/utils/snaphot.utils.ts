import { findAllCanvasGrids, findCanvasInSubtree, getCanvasData, getCanvasGridData } from "../../ui-layout/utils/dom.utils"
import { CanvasGridSnapshot, CanvasSnapshot } from "../types/snapshot.types";

export const getCanvasSnapshot = () : CanvasSnapshot | null => {
    return getCanvasSnapshotFrom(document.body);
}

export const getCanvasSnapshotFrom = (el: Element) : CanvasSnapshot | null => {
    const canvasEl = findCanvasInSubtree(el as HTMLDivElement);
    if (!canvasEl) return null;

    const data = getCanvasData(canvasEl);
    if (!data) return null;

    const grids : CanvasGridSnapshot[] = getAllCanvasGridSnapshotsFor(canvasEl);

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

export const getAllCanvasGridSnapshotsFor = (canvasEl: HTMLDivElement): CanvasGridSnapshot[] => {
    return findAllCanvasGrids(canvasEl).map(gridEl => getCanvasGridSnapshotFor(gridEl)!)
}

export const getCanvasGridSnapshotFor = (gridEl: HTMLDivElement): CanvasGridSnapshot | null => {
    const gridData = getCanvasGridData(gridEl);
    if (!gridData) return null;

    return {
        rect: gridEl.getBoundingClientRect(),
        gridName: gridData.name,
        gridRect: gridData.position
    }
}