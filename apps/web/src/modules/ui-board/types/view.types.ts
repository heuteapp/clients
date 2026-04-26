import { BoardCardContent } from "../../d-board/types/board.types";
import { GridSpan } from "../../d-core/types/common";
import { ViewSchema } from "../../ui-base/types/view.types";

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
    cards: BoardCardItemViewState[];
}

export interface BoardCardContainerViewState {
    cards: BoardCardItemViewState[];
}

export type BoardCardItemViewState = {
    content: BoardCardContent;
    isFrontFace: boolean;
    cardSpan?: GridSpan;
    cellStep?: number;
}