import { BaseData } from "@/src/types/shared/data";
import { CardPlacement } from "@/src/types/shared/board";

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