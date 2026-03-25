import { BoardCardModel, BoardModel } from "@/src/modules/domain/board/types/board.model";

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