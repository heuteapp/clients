import { StoredCanvasModel, StoredCanvasStyle } from "@/src/heute-store/types/canvas.types";
import { CanvasGridModel, CanvasModel } from "../../d-canvas/types/canvas.model.types";
import { SimpleViewOverrides } from "../../ui-base/types/view.types";

export interface CanvasRootProps extends SimpleViewOverrides {
    rootRef?: React.RefObject<HTMLDivElement | null>;
    src: CanvasModel;
}

export interface CanvasGridContainerProps extends SimpleViewOverrides {
    rowCount: number; colCount: number;
    gridSources: CanvasGridModel[];
}

export interface CanvasGridSectionProps extends SimpleViewOverrides {
    src: CanvasGridModel;
}

export interface CanvasGridItemProps extends SimpleViewOverrides  {
    src: CanvasGridModel
}

export interface CanvasProviderProps {
    rootRef: React.RefObject<HTMLDivElement | null>;
    metricsId?: string;
    dataSource: StoredCanvasModel | null;
    styleSource: StoredCanvasStyle | null;
    children: React.ReactNode;
}