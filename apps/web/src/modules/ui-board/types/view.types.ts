import { BoardCardModel, BoardModel } from "../../d-board/types/board.model.types";
import { ViewSchema } from "../../t-core/types/view.types";

export type BoardViewSchema = ViewSchema<"board", 
{
    "board-card-container": {
        "board-card-item": {
            "title": true
            "frontFace": true
            "backFace": true
        }
    }
}, 
{
    "board-root": BoardRootViewState;
    "board-card-container": BoardCardContainerViewState;
    "board-card-item": BoardCardItemViewState
}>;

//

export interface BoardRootViewState {
    board: BoardModel;
}

export interface BoardCardContainerViewState {
    cards: BoardCardModel[];
}

export type BoardCardItemViewState = {
    data: BoardCardModel;
    isFrontFace?: boolean;
    cellStep?: number;
}