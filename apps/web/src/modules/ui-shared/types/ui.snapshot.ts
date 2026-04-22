import { GridDimensions, GridRect, Rect } from "../../shared/types/common"

export interface UISnapshot {
    rect: Rect;
}

export interface CanvasSnapshot extends UISnapshot {
    dimensions: GridDimensions;
    grids: CanvasGridSnapshot[];
}

export interface CanvasGridSnapshot extends UISnapshot {
    gridKey: string;
    gridRect: GridRect;
}