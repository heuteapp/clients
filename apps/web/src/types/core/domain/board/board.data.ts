import { BaseData } from "@/src/types/shared/core/data";
import { CardPlacement } from "@/src/types/shared/core/board";

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