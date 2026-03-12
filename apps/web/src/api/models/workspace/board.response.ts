import { LayoutResponse } from "./layout.response";

export interface BoardResponse {
    layout: LayoutResponse;
    cards: BoardCardResponse[];
}

export interface BoardCardResponse {
    title: string | null;
    sectionName: string | null;
    colIndex: number | null;
    rowIndex: number | null;
    colSpan: number | null;
    rowSpan: number | null;
}