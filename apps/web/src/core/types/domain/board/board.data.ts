import { BaseData } from "@/src/core/types/shared/data";
import { CardPlacement } from "@/src/core/types/shared/board";

export interface BoardData extends BaseData {
    category: string;
    date: Date;
    layoutId: string;
}

export interface BoardCardData extends BaseData {
    placement: CardPlacement | null;
}