import { CardPlacement } from "@/src/types/shared/core/board";

export interface BoardModel {
    layoutId: string;
    categoryName: string;
    date: Date;
    cards: BoardCardModel[];
}

export interface BoardCardModel {
    name: string;
    content: BoardCardContent;
    placement: CardPlacement | null;
}

export interface BoardCardContent {
    title: string | null;
}