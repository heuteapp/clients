export interface BoardData {
    id: string;
    category: string;
    date: Date;
    layoutId: string;
}

export interface BoardCardData {
    id: string;
    sectionName: string;
    rowIndex: number;
    colIndex: number;
    rowSpan: number;
    colSpan: number;
}