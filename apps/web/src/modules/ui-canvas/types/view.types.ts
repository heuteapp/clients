export interface CanvasRootViewState {
}

export interface CanvasGridContainerViewState {
}

export interface CanvasGridSectionViewState {
    areaName: string;
    item?: CanvasGridItemViewState;
}

export interface CanvasGridItemViewState {
    colSpan: number;
    rowSpan: number;
    showCells?: boolean;
}