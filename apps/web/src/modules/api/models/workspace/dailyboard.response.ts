import { LayoutResponse } from "./layout.response";

export interface DailyboardResponse {
    date: string;
    layout: LayoutResponse;
    cards: DailyboardCardResponse[];
}

export interface DailyboardCardResponse {
    name: string;
    title: string | null;
    sectionName: string | null;
    colIndex: number | null;
    rowIndex: number | null;
    colSpan: number | null;
    rowSpan: number | null;
}