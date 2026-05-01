import { BoardCardContent } from "../../d-board/types/board.types";
import { GridRect } from "../../d-core/types/common";
import { ResolveHierarchy, ResolveStates, ViewSchema } from "../../t-view/types/view.types";
import { CanvasViewSchemaContext, CanvasViewSchemaHierarchy, CanvasViewSchemaStates } from "../../ui-canvas/types/view.types";

export interface BoardViewSchema extends ViewSchema {
    context: BoardViewSchemaContext;
    states: BoardViewSchemaStates
}

export type BoardViewSchemaContext = {
    metrics: {
        layout: CanvasViewSchemaContext["metrics"];
    }
};

export type BoardViewSchemaHierarchy = ResolveHierarchy<"board", {
    "root": {
        canvas: "canvas:root";
        container: "card-container";
    },
    "card-container": {
        items: "card-item"[];
    },
}, [CanvasViewSchemaHierarchy]>;

export type BoardViewSchemaStates = ResolveStates<"board", {
    "card-item": {
        content: BoardCardContent;
        position: GridRect;
    };
}, [CanvasViewSchemaStates]>;