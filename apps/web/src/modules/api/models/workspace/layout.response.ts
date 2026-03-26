export interface LayoutResponse {
    name: string;
    version: number;
    colCount: number;
    rowCount: number;
    sections: LayoutSectionResponse[];
}

export interface LayoutSectionResponse {
    name: string;
    colIndex: number;
    rowIndex: number;
    colSpan: number;
    rowSpan: number;
}