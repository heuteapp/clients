import { CanvasResponse } from "./canvas.response";

export interface DailyboardResponse {
    categoryPath: string;
    date: string;
    canvas: CanvasResponse;
    layout: CanvasResponse;
    cards: DailyboardCardResponse[];
}

export interface DailyboardCardResponse {
    name: string;
    title?: string;
    gridName?: string;
    colIndex?: number;
    rowIndex?: number;
    colSpan?: number;
    rowSpan?: number;
}