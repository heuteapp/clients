export interface LayoutResponse {
    colCount: number;
    rowCount: number;
    sections: LayoutSectionResponse[];
}

export interface LayoutSectionResponse {
    colIndex: number;
    rowIndex: number;
    colSpan: number;
    rowSpan: number;
}