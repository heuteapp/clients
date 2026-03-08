import { HeuteLayoutData } from "../layout/types/data";

export interface BoardData {
    id: string;
    category: string;
    date: Date;
    layout: HeuteLayoutData;
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