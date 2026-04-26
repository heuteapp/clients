import { StoredCanvasModel, StoredCanvasStyle } from "@/src/heute-store/types/canvas.types";
import { CanvasGridModel, CanvasModel } from "../../d-canvas/types/canvas.model.types";
import { ViewSlot } from "../../ui-base/types/view.types";

export interface CanvasRootProps extends ViewSlot {
    rootRef?: React.RefObject<HTMLDivElement | null>;
    src: CanvasModel;
}

export interface CanvasGridContainerProps extends ViewSlot {
    rowCount: number; colCount: number;
    gridSources: CanvasGridModel[];
}

export interface CanvasGridSectionProps extends ViewSlot {
    src: CanvasGridModel;
}

export interface CanvasGridItemProps extends ViewSlot  {
    src: CanvasGridModel
}

export interface CanvasProviderProps {
    rootRef: React.RefObject<HTMLDivElement | null>;
    metricsId?: string;
    dataSource: StoredCanvasModel | null;
    styleSource: StoredCanvasStyle | null;
    children: React.ReactNode;
}