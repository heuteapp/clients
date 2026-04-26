import { StoredCanvasModel, StoredCanvasStyle } from "@/src/heute-store/types/canvas.types";
import { CanvasGridModel, CanvasModel } from "../../d-canvas/types/canvas.model.types";
import { ViewSlot } from "../../ui-base/types/view.types";
import { CanvasViewSchema } from "../../ui-canvas/types/view.types";

export interface CanvasRootProps {
    rootRef?: React.RefObject<HTMLDivElement | null>;
    src: CanvasModel;
    slot?: ViewSlot<"canvas-root", CanvasViewSchema["tree"]>;
}

export interface CanvasGridContainerProps {
    rowCount: number; colCount: number;
    gridSources: CanvasGridModel[];
    slot?: ViewSlot<"canvas-grid-container", CanvasViewSchema["tree"]>;
}

export interface CanvasGridSectionProps {
    src: CanvasGridModel;
    slot?: ViewSlot<"canvas-grid-section", CanvasViewSchema["tree"]>;
}

export interface CanvasGridItemProps  {
    src: CanvasGridModel
    slot?: ViewSlot<"canvas-grid-item", CanvasViewSchema["tree"]>;
}

export interface CanvasProviderProps {
    rootRef: React.RefObject<HTMLDivElement | null>;
    metricsId?: string;
    dataSource: StoredCanvasModel | null;
    styleSource: StoredCanvasStyle | null;
    children: React.ReactNode;
}