import { StoredCanvasModel, StoredCanvasStyle } from "@/src/heute-store/types/canvas.types";
import { CanvasGridModel, CanvasModel } from "../../d-canvas/types/canvas.model.types";
import { CanvasViewSchema } from "../../ui-canvas/types/view.types";
import { ViewUXProps } from "../../ui-base/types/props.types";

export interface CanvasRootProps extends ViewUXProps<"canvas-root", CanvasViewSchema> {
    rootRef?: React.RefObject<HTMLDivElement | null>;
    src: CanvasModel;
}

export interface CanvasGridContainerProps extends ViewUXProps<"canvas-grid-container", CanvasViewSchema> {
    rowCount: number; colCount: number;
    gridSources: CanvasGridModel[];
}

export interface CanvasGridSectionProps extends ViewUXProps<"canvas-grid-section", CanvasViewSchema> {
    src: CanvasGridModel;
}

export interface CanvasGridItemProps extends ViewUXProps<"canvas-grid-item", CanvasViewSchema> {
    src: CanvasGridModel
}

export interface CanvasProviderProps {
    rootRef: React.RefObject<HTMLDivElement | null>;
    metricsId?: string;
    dataSource: StoredCanvasModel | null;
    styleSource: StoredCanvasStyle | null;
    children: React.ReactNode;
}