import { ViewProps, ViewRootProps } from "../../t-view/types/view.types";
import { CanvasViewSchema } from "./view.types";

export type CanvasRootViewProps = ViewRootProps<"canvas", CanvasViewSchema>;

export type CanvasGridContainerViewProps = ViewProps<"canvas:grid-container", CanvasViewSchema>;

export type CanvasGridSectionViewProps = ViewProps<"canvas:grid-section", CanvasViewSchema>;

export type CanvasGridItemViewProps = ViewProps<"canvas:grid-item", CanvasViewSchema>;