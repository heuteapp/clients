import { GridDimensions, GridRect } from "../../d-core/types/common";
import { ViewSchema } from "../../t-view/types/view.types";

export interface CanvasViewSchema extends ViewSchema {
    context: CanvasViewSchemaContext;
    states: CanvasViewSchemaStates
}

export type CanvasViewSchemaContext = {
    metrics: {
        canvasCellSize: number;
        gridCellSize: number;
    }
};

export type CanvasViewSchemaStates = {
    "root": {
        container: CanvasViewSchemaStates["grid-container"];
    },
    "grid-container": {
        dimensions: GridDimensions;
        items: CanvasViewSchemaStates["grid-item"][];
    },
    "grid-section": {
        item: CanvasViewSchemaStates["grid-item"];
    },
    "grid-item": {
        areaName: string;
        position: GridRect;
    };
}