import { CanvasModel, CanvasGridModel } from "../../d-canvas/types/canvas.model.types";
import { GridDimensions } from "../../d-core/types/common";
import { ViewSchema } from "../../t-core/types/view.types";

export type CanvasViewSchema = ViewSchema<"canvas", CanvasViewContextSchema, CanvasViewHiearchySchema, CanvasViewStateSchema>;

export type CanvasViewContextSchema = {
    
}

export type CanvasViewHiearchySchema = {
    "canvas-grid-container": {
        "canvas-grid-section": {
            "canvas-grid-item": true;
        }
    }
}

export type CanvasViewStateSchema = {
    "canvas-root": CanvasRootViewState;
    "canvas-grid-container": CanvasGridContainerViewState;
    "canvas-grid-section": CanvasGridSectionViewState;
    "canvas-grid-item": CanvasGridItemViewState;
}

//

export type CanvasViewStates =
    | CanvasRootViewState
    | CanvasGridContainerViewState
    | CanvasGridSectionViewState
    | CanvasGridItemViewState;

export interface CanvasRootViewState {
    canvas: CanvasModel;
}

export interface CanvasGridContainerViewState {
    dimensions: GridDimensions;
    grids: CanvasGridModel[];
}

export interface CanvasGridSectionViewState {
    data: CanvasGridModel;
}

export interface CanvasGridItemViewState {
    data: CanvasGridModel;
}