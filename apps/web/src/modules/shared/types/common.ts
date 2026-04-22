export interface Pointer {
    x: number;
    y: number;
}

export interface Size {
    width: number;
    height: number;
}

export interface Rect extends Pointer, Size {}

//

export interface GridDelta {
    row: number;
    col: number;
}

export interface GridIndex {
    rowIndex: number;
    colIndex: number;
}

export interface GridSpan {
    rowSpan: number;
    colSpan: number;
}

export interface GridRect extends GridIndex, GridSpan {}

export interface GridDimensions {
    rowCount: number;
    columnCount: number;
}

export interface GridRect extends GridIndex, GridSpan {}

//

export type ResizeDirection = "n" | "e" | "s" | "w" | "ne" | "nw" | "se" | "sw";

export type ResizeParams = {
    direction: ResizeDirection;
    delta: GridDelta;
    dimensions: GridDimensions;
    minSpan: GridSpan;
}