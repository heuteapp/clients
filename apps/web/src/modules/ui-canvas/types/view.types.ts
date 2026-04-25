import { GridRect } from "../../d-core/types/common";

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

//

export type CanvasViewKeys = 
    | "canvas-root" 
    | "canvas-grid-container" 
    | "canvas-grid-section" 
    | "canvas-grid-item";