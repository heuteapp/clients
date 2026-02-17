export interface Point {
    x: number;
    y: number;
}

export interface Size {
    width: number;
    height: number;
}

export interface Span {
    cols: number;
    rows: number;
}

// (x, y) + (x + width, y + height)
export interface Rect extends Point, Size {}

// (x1, y1) + (x2, y2)
export interface Bounds {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

// like padding/margin
export interface Edges {
    top: number;
    right: number;
    bottom: number;
    left: number;
}