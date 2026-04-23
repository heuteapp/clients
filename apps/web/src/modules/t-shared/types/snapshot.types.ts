import { DailyboardCardContent, DailyboardCardPlacement } from "../../dailyboard/types/dailyboard.model.types";
import { GridDimensions, GridRect, Rect } from "../../shared/types/common"
import { YYMMDDDate } from "../../shared/types/date.types";

export interface BaseSnapshot {
    rect: Rect;
}

export interface CanvasSnapshot extends BaseSnapshot {
    canvasName: string;
    canvasVersion: number;
    dimensions: GridDimensions;
    grids: CanvasGridSnapshot[];
}

export interface CanvasGridSnapshot extends BaseSnapshot {
    gridName: string;
    gridRect: GridRect;
}

export interface DailyboardSnapshot extends BaseSnapshot {
    categoryPath: string;
    date: YYMMDDDate;
    canvas: CanvasSnapshot;
    cards: DailyboardCardSnapshot[];
}

export interface DailyboardCardSnapshot extends BaseSnapshot {
    cardKey: string;
    cardContent: DailyboardCardContent;
    cardPlacement: DailyboardCardPlacement | null;
}