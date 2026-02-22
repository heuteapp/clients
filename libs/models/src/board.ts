import { BoardCardModel } from "./board-card";

export interface BoardModel {
    layoutId: string
    cards: BoardCardModel[];
}

export default BoardModel;