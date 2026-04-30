import { ViewProps } from "../../t-view/types/view.types";
import { CanvasViewSchema } from "./view.types";

export interface CanvasRootViewProps extends ViewProps<"root", CanvasViewSchema> {

}

export interface CanvasGridContainerViewProps extends ViewProps<"grid-container", CanvasViewSchema> {

}

export interface CanvasGridSectionViewProps extends ViewProps<"grid-section", CanvasViewSchema> {

}

export interface CanvasGridItemViewProps extends ViewProps<"grid-item", CanvasViewSchema> {

}