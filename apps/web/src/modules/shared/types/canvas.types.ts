import { GridDimensions, GridRect, Rect } from "./common";

export interface CanvasSnapshot {
    canvasSize: GridDimensions;
    grids: CanvasGridSnapshot[];
}

export interface CanvasGridSnapshot {
    gridKey: string;
    gridRect: GridRect;
    screenRect: Rect;
}