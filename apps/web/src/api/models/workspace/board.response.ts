import { LayoutResponse } from "./layout.response";

export interface BoardResponse {
    date: string;
    layout: LayoutResponse;
    cards: BoardCardResponse[];
}

export interface BoardCardResponse {
    name: string;
    title: string | null;
    sectionName: string | null;
    colIndex: number | null;
    rowIndex: number | null;
    colSpan: number | null;
    rowSpan: number | null;
}