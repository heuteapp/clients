export interface CanvasResponse {
    name: string;
    version: number;
    colCount: number;
    rowCount: number;
    sections: CanvasGridResponse[];
    grids: CanvasGridResponse[];
}

export interface CanvasGridResponse {
    name: string;
    colIndex: number;
    rowIndex: number;
    colSpan: number;
    rowSpan: number;
}