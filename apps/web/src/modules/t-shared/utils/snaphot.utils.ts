import { findAllDailyboardCards, findDailyboardInSubtree, getDailyboardCardData, getDailyboardData } from "../../ui-dailyboard/utils/dom.utils";
import { findAllCanvasGrids, findCanvasInSubtree, getCanvasData, getCanvasGridData } from "../../ui-layout/utils/dom.utils"
import { CanvasGridSnapshot, CanvasSnapshot, DailyboardCardSnapshot, DailyboardSnapshot } from "../types/snapshot.types";

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

//

export const getDailyboardSnapshot = () : DailyboardSnapshot | null => {
    return getDailyboardSnapshotFrom(document.body);
}

export const getDailyboardSnapshotFrom = (el: Element) : DailyboardSnapshot | null => {
    const dailyboardEl = findDailyboardInSubtree(el as HTMLDivElement);
    if (!dailyboardEl) return null;

    const data = getDailyboardData(dailyboardEl);
    if (!data) return null;

    const canvasSnapshot = getCanvasSnapshotFrom(dailyboardEl);

    const cardSnapshots = getDailyboardCardSnapshotsFor(dailyboardEl);

    return {
        rect: dailyboardEl.getBoundingClientRect(),
        categoryPath: data.categoryPath,
        date: data.date,
        canvas: canvasSnapshot!,
        cards: cardSnapshots
    }
}

export const getDailyboardCardSnapshotsFor = (dailyboardEl: HTMLDivElement): DailyboardCardSnapshot[] => {
    return findAllDailyboardCards(dailyboardEl).map(cardEl => getDailyboardCardSnapshotFor(cardEl)!);
};

export const getDailyboardCardSnapshotFor = (cardEl: HTMLDivElement) : DailyboardCardSnapshot | null => {
    const cardData = getDailyboardCardData(cardEl);
    if (!cardData) return null;

    return {
        rect: cardEl.getBoundingClientRect(),
        cardKey: cardEl.dataset.key || "",
        cardContent: cardData.content,
        cardPlacement: cardData.placement
    }
}