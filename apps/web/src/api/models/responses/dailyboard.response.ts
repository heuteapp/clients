import { LayoutResponse } from "./layout.response";

export interface DailyboardResponse {
    categoryPath: string;
    date: string;
    layout: LayoutResponse;
    cards: DailyboardCardResponse[];
}

export interface DailyboardCardResponse {
    name: string;
    title?: string;
    sectionName?: string;
    colIndex?: number;
    rowIndex?: number;
    colSpan?: number;
    rowSpan?: number;
}