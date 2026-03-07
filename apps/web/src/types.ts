export type Pointer = {
    x: number;
    y: number;
}

export type GridPosition = {
    rowIndex: number;
    colIndex: number;
}

export type GridSize = {
    rowSpan: number;
    colSpan: number;
}

export type ResizeHandle = "n" | "e" | "s" | "w" | "ne" | "nw" | "se" | "sw"