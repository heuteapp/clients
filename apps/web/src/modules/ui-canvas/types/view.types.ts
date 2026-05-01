import { GridDimensions, GridRect } from "../../d-core/types/common";
import { ResolveHierarchy, ViewSchema } from "../../t-view/types/view.types";

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

export type CanvasViewSchemaHierarchy = ResolveHierarchy<"canvas", {
    "root": {
        container: "grid-container";
    },
    "grid-container": {
        items: "grid-item"[];
    },
    "grid-section": {
        item: "grid-item";
    },
}>

export type CanvasViewSchemaStates = {
    "canvas:grid-container": {
        dimensions: GridDimensions;
    },
    "canvas:grid-item": {
        areaName: string;
        position: GridRect;
    },
}