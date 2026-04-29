import { StoredCanvasModel, StoredCanvasStyle } from "@/src/heute-store/types/canvas.types";
import { CanvasGridModel, CanvasModel } from "../../d-canvas/types/canvas.model.types";
import { CanvasViewSchema } from "../../ui-canvas/types/view.types";
import { ViewProps } from "../../t-core/types/props.types";

export interface CanvasRootProps extends ViewProps<"canvas-root", CanvasViewSchema> {
    rootRef?: React.RefObject<HTMLDivElement | null>;
    src: CanvasModel;
}

export interface CanvasGridContainerProps extends ViewProps<"canvas-grid-container", CanvasViewSchema> {
    rowCount: number; colCount: number;
    gridSources: CanvasGridModel[];
}

export interface CanvasGridSectionProps extends ViewProps<"canvas-grid-section", CanvasViewSchema> {
    src: CanvasGridModel;
}

export interface CanvasGridItemProps extends ViewProps<"canvas-grid-item", CanvasViewSchema> {
    src: CanvasGridModel
}

export interface CanvasProviderProps {
    rootRef: React.RefObject<HTMLDivElement | null>;
    metricsId?: string;
    dataSource: StoredCanvasModel | null;
    styleSource: StoredCanvasStyle | null;
    children: React.ReactNode;
}