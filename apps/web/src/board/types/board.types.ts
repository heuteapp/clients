import { GridRect } from "@/src/types/shared/core/common";

export interface Board {
    layoutId: string;
    categoryName: string;
    date: Date;
    cards: BoardCard[];
}

export interface BoardCard {
    name: string;
    content: BoardCardContent;
    placement: BoardCardPlacement | null;
}

export interface BoardCardContent {
    title: string | null;
}

export interface BoardCardPlacement {
    sectionName: string;
    position: GridRect;
}