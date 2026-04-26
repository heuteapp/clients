import { GridRect } from "../../d-core/types/common";
import { ViewSchema } from "../../ui-base/types/view.types";

export type CanvasViewSchema = ViewSchema<"canvas", {
    "canvas-grid-container": {
        "canvas-grid-section": {
            "canvas-grid-item": true;
        }
    }
}>;

//

export type CanvasViewStates =
    | CanvasRootViewState
    | CanvasGridContainerViewState
    | CanvasGridSectionViewState
    | CanvasGridItemViewState;

export interface CanvasRootViewState {
    container?: CanvasGridContainerViewState;
}

export interface CanvasGridContainerViewState {
    colCount: number;
    rowCount: number;
    areas: CanvasGridSectionViewState[];
}

export interface CanvasGridSectionViewState {
    areaName: string;
    position: GridRect;
    item?: CanvasGridItemViewState;
}

export interface CanvasGridItemViewState {
    colSpan: number;
    rowSpan: number;
}