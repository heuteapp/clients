export interface BoardData {
    id: string;
    category: string;
    date: Date;
    cards: BoardCardData[];
}

export interface BoardCardData {
    id: string;
    sectionId: string;
    rowIndex: number;
    colIndex: number;
    rowSpan: number;
    colSpan: number;
}