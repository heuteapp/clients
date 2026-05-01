import { GridDimensions, GridRect } from "../../d-core/types/common";
import { ResolveHierarchy, ResolveStates, ViewSchema } from "../../t-view/types/view.types";

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

export type CanvasViewSchemaStates = ResolveStates<"canvas", {
    "grid-container": {
        dimensions: GridDimensions;
    },
    "grid-item": {
        areaName: string;
        position: GridRect;
    },
}>