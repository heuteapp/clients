import { RichViewProps, SimpleViewProps } from "../../ui-base/types/props.types";
import { CanvasGridContainerViewState, CanvasGridItemViewState, CanvasGridSectionViewState, CanvasRootViewState } from "./view.types";

export interface CanvasRootViewProps extends RichViewProps<CanvasRootViewState, "gridContainer" | "gridSection" | "gridItem"> {
}

export interface CanvasGridContainerViewProps extends RichViewProps<CanvasGridContainerViewState, "gridContainer" | "gridItem"> {
}

export interface CanvasGridSectionViewProps extends RichViewProps<CanvasGridSectionViewState, "gridItem"> {
}

export interface CanvasGridItemViewProps extends SimpleViewProps<CanvasGridItemViewState> {
}