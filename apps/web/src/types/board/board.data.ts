export interface BoardData {
    id: string;
    category: string;
    date: Date;
    layoutId: string;
}

export interface BoardCardData {
    id: string;
    sectionId: string;
    rowIndex: number;
    colIndex: number;
    rowSpan: number;
    colSpan: number;
}