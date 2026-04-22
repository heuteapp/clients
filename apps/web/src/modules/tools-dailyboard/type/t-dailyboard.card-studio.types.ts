
export interface DailyboardCardStudioProps {
    initialColSpan?: number;
    initialRowSpan?: number;
    initialCol?: number;
    initialRow?: number;
    onResize: (colSpan: number, rowSpan: number, col: number, row: number) => void;
    maxCols?: number;
    maxRows?: number;
    minColSpan?: number;
    minRowSpan?: number;
    cellSize?: number;
    cellGap?: number;
}

export type ResizeMode = 
    | "move" 
    | "top" 
    | "bottom" 
    | "left" 
    | "right" 
    | "topLeft" 
    | "topRight" 
    | "bottomLeft" 
    | "bottomRight";