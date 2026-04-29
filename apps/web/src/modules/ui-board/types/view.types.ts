import { BoardCardContent } from "../../d-board/types/board.types";
import { GridRect } from "../../d-core/types/common";
import { ViewSchema } from "../../t-core/types/view.types";

export type BoardViewSchema = ViewSchema<"board", BoardViewContextSchema, BoardViewHiearchySchema, BoardViewStateSchema>;

export type BoardViewContextSchema = {
    isFrontFace?: boolean;
    cellStep?: number;
}

export type BoardViewHiearchySchema = {
    "board-card-container": {
        "board-card-item": {
            "title": true
            "frontFace": true
            "backFace": true
        }
    }
}

export type BoardViewStateSchema = {
    "board-root": {
        container: BoardViewStateSchema["board-card-container"];
    };
    "board-card-container": {
        items: BoardViewStateSchema["board-card-item"][];
    };
    "board-card-item": {
        content: BoardCardContent;
        position: GridRect;
    }
}