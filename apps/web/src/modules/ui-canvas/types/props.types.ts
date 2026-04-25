import { RichViewProps, SimpleViewProps } from "../../ui-base/types/props.types";
import { CanvasGridContainerViewState, CanvasGridItemViewState, CanvasGridSectionViewState, CanvasRootViewState } from "./view.types";

export interface CanvasRootViewProps extends RichViewProps<CanvasRootViewState, "container"> {
}

export interface CanvasGridContainerViewProps extends SimpleViewProps<CanvasGridContainerViewState> {
}

export interface CanvasGridSectionViewProps extends RichViewProps<CanvasGridSectionViewState, "item"> {
}

export interface CanvasGridItemViewProps extends SimpleViewProps<CanvasGridItemViewState> {
}