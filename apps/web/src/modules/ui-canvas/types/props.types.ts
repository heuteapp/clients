import { ViewProps, ViewRootProps } from "../../t-core/types/props.types";
import { CanvasViewSchema } from "./view.types";

export interface CanvasRootViewProps extends ViewRootProps<"canvas", CanvasViewSchema> {
}

export interface CanvasGridContainerViewProps extends ViewProps<"canvas-grid-container", CanvasViewSchema> {
}

export interface CanvasGridSectionViewProps extends ViewProps<"canvas-grid-section", CanvasViewSchema> {
}

export interface CanvasGridItemViewProps extends ViewProps<"canvas-grid-item", CanvasViewSchema> {
}