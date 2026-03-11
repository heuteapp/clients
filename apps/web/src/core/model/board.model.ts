import { BoardCardModel, BoardModel } from "../types/domain/board/board.model";

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