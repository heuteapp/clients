import { BaseData } from "@/src/core/types/shared/data";
import { GridRect } from "../../shared/common";

export interface BoardData extends BaseData {
    category: string;
    date: Date;
    layoutId: string;
}

export interface BoardCardData extends BaseData {
    placement: CardPlacement | null;
}

export interface CardPlacement {
    sectionName: string;
    position: GridRect;
}