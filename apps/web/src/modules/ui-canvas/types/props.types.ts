import { SimpleViewProps } from "../../ui-base/types/props.types";
import { CanvasGridContainerViewState, CanvasGridItemViewState, CanvasGridSectionViewState, CanvasRootViewState } from "./view.types";

export interface CanvasRootViewProps extends SimpleViewProps<CanvasRootViewState> {
}

export interface CanvasGridContainerViewProps extends SimpleViewProps<CanvasGridContainerViewState> {
}

export interface CanvasGridSectionViewProps extends SimpleViewProps<CanvasGridSectionViewState> {
}

export interface CanvasGridItemViewProps extends SimpleViewProps<CanvasGridItemViewState> {
}