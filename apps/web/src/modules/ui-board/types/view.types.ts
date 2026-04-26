import { BoardCardContent } from "../../d-board/types/board.types";
import { GridSpan } from "../../d-core/types/common";
import { ViewSchema, ViewTreeSchema } from "../../ui-base/types/view.types";

export type BoardViewSchema = ViewSchema<"board", {
    "board-card-container": {
        "board-card-item": {
            "title": true
            "front-face": true
            "back-face": true
        }
    }
}>;

//

export type BoardViewStates =
    | BoardRootViewState
    | BoardCardItemViewState;

export interface BoardRootViewState {
    
}

export type BoardCardItemViewState = {
    content: BoardCardContent;
    isFrontFace: boolean;
    cardSpan?: GridSpan;
    cellStep?: number;
}