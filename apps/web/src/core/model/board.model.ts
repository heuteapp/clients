import { BoardCard, Board } from "@/src/board/types/board.types";

export function createBoardModel(
    layoutId: string, 
    categoryName: string, 
    date: Date,
    cards: BoardCard[]
): Board {
    return {
        layoutId,
        categoryName,
        date,
        cards
    };
}