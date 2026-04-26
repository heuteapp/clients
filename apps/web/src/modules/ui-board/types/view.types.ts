import { BoardCardContent } from "../../d-board/types/board.types";
import { GridSpan } from "../../d-core/types/common";
import { ViewTreeSchema } from "../../ui-base/types/view.types";

export interface BoardViewSchema extends ViewTreeSchema {
    "board-root": true;
    "board-card-item": {
        "title": true;
        "frontFace": true;
        "backFace": true;
    }
}

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