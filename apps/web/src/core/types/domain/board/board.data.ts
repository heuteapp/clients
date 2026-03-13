import { BaseData } from "@/src/core/types/shared/data";
import { CardPlacement } from "@/src/core/types/shared/board";

export interface BoardData extends BaseData {
    layoutName: string;
    layoutVersion: number;
    category: string;
    date: Date;
}

export interface BoardCardData extends BaseData {
    name: string;
    content: { title: string | null };
    placement: CardPlacement | null;
}