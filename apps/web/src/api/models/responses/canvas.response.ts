export interface CanvasResponse {
    name: string;
    version: number;
    colCount: number;
    rowCount: number;
    sections: CanvasSectionResponse[];
}

export interface CanvasSectionResponse {
    name: string;
    colIndex: number;
    rowIndex: number;
    colSpan: number;
    rowSpan: number;
}