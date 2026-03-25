import { GridRect } from "@/src/shared/types/common";

export interface Board {
    layoutName: string;
    layoutVersion: number;
    categoryPath: string;
    date: Date;
    cards: BoardCard[];
}

export interface BoardCard {
    name: string;
    content: BoardCardContent;
    placement: BoardCardPlacement | null;
}

//

export type BoardData = Omit<Board, "cards">;

export type BoardCardData = Omit<BoardCard, "">;

//

export interface BoardCardContent {
    title: string | null;
}

export interface BoardCardPlacement {
    sectionName: string;
    position: GridRect;
}