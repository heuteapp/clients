import { GridDimensions, GridRect } from "../../d-core/types/common";
import { ResolveRichState, ResolveState, ViewSchema } from "../../t-view/types/view.types";

export interface CanvasViewSchema extends ViewSchema {
    context: CanvasViewSchemaContext;
    hierarchy: CanvasViewSchemaHierarchy;
    states: CanvasViewSchemaStates
}

export type CanvasViewSchemaContext = {
    metrics: {
        canvasCellSize: number;
        gridCellSize: number;
    }
};

export type CanvasViewSchemaHierarchy = {
    "canvas:root": {
        container: "grid-container";
    },
    "canvas:grid-container": {
        items: "grid-item"[];
    },
    "canvas:grid-section": {
        item: "grid-item";
    },
}

export type CanvasViewSchemaStates = {
    "canvas:grid-container": {
        dimensions: GridDimensions;
    },
    "canvas:grid-item": {
        areaName: string;
        position: GridRect;
    },
}