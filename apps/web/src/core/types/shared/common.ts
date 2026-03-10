export interface Pointer {
    x: number;
    y: number;
}

export interface GridPosition {
    rowIndex: number;
    colIndex: number;
}

export interface GridSize {
    rowSpan: number;
    colSpan: number;
}

export interface GridDimensions {
    rowCount: number;
    columnCount: number;
}

export interface GridRect extends GridPosition, GridSize {}

export type ResizeHandle = "n" | "e" | "s" | "w" | "ne" | "nw" | "se" | "sw"