import { ViewProps } from "../../ui-base/types/props.types";
import { CanvasGridContainerViewState, CanvasGridItemViewState, CanvasGridSectionViewState, CanvasRootViewState, CanvasViewKeys, CanvasViewStates } from "./view.types";

export interface CanvasRootViewProps extends ViewProps<CanvasRootViewState, CanvasViewStates, CanvasViewKeys> {
}

export interface CanvasGridContainerViewProps extends ViewProps<CanvasGridContainerViewState, CanvasViewStates, CanvasViewKeys> {
}

export interface CanvasGridSectionViewProps extends ViewProps<CanvasGridSectionViewState, CanvasViewStates, CanvasViewKeys> {
}

export interface CanvasGridItemViewProps extends ViewProps<CanvasGridItemViewState, CanvasViewStates, CanvasViewKeys> {
}