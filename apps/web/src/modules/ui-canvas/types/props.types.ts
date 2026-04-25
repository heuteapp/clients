import { ViewProps } from "../../ui-base/types/props.types";
import { CanvasGridContainerViewState, CanvasGridItemViewState, CanvasGridSectionViewState, CanvasRootViewState, CanvasViewSchema, CanvasViewStates } from "./view.types";

export interface CanvasRootViewProps extends ViewProps<CanvasViewSchema, CanvasRootViewState, CanvasViewStates> {
}

export interface CanvasGridContainerViewProps extends ViewProps<CanvasViewSchema, CanvasGridContainerViewState, CanvasViewStates> {
}

export interface CanvasGridSectionViewProps extends ViewProps<CanvasViewSchema, CanvasGridSectionViewState, CanvasViewStates> {
}

export interface CanvasGridItemViewProps extends ViewProps<CanvasViewSchema, CanvasGridItemViewState, CanvasViewStates> {
}