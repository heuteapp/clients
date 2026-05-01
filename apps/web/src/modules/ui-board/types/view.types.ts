import { BoardCardContent } from "../../d-board/types/board.types";
import { GridRect } from "../../d-core/types/common";
import { ViewSchema } from "../../t-view/types/view.types";
import { CanvasViewSchemaContext, CanvasViewSchemaStates } from "../../ui-canvas/types/view.types";

export interface BoardViewSchema extends ViewSchema {
    context: BoardViewSchemaContext;
    states: BoardViewSchemaStates
}

export type BoardViewSchemaContext = {
    metrics: {
        layout: CanvasViewSchemaContext["metrics"];
    }
};

export type BoardViewSchemaStates = {
    "root": {
        canvas: CanvasViewSchemaStates["root"];
        container: BoardViewSchemaStates["card-container"];
    },
    "card-container": {
        items: BoardViewSchemaStates["card-item"][];
    },
    "card-item": {
        content: BoardCardContent;
        position: GridRect;
    };
}