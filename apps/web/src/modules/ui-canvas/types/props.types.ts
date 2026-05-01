import { ViewProps } from "../../t-view/types/view.types";
import { CanvasViewSchema } from "./view.types";

export type CanvasRootViewProps = ViewProps<"root", CanvasViewSchema>;

export type CanvasGridContainerViewProps = ViewProps<"grid-container", CanvasViewSchema>;

export type CanvasGridSectionViewProps = ViewProps<"grid-section", CanvasViewSchema>;

export type CanvasGridItemViewProps = ViewProps<"grid-item", CanvasViewSchema>;