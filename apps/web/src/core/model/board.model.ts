import { BoardCardModel, BoardModel } from "@/src/types/core/domain/board/board.model";

export function createBoardModel(
    layoutId: string, 
    categoryName: string, 
    date: Date,
    cards: BoardCardModel[]
): BoardModel {
    return {
        layoutId,
        categoryName,
        date,
        cards
    };
}