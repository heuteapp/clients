import { HeuteLayoutData } from "../layout/types/layout.data.types";

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