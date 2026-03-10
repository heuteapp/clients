import { BaseData } from "@/src/core/types/shared/data";

export interface BoardData extends BaseData {
    category: string;
    date: Date;
    layoutId: string;
}

export interface BoardCardData extends BaseData {
    sectionName: string;
    rowIndex: number;
    colIndex: number;
    rowSpan: number;
    colSpan: number;
}