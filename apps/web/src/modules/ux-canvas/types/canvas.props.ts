import { StoredCanvasModel, StoredCanvasStyle } from "@/src/heute-store/types/canvas.types";
import { CanvasGridModel, CanvasModel } from "../../d-canvas/types/canvas.model.types";
import { CanvasViewSchema } from "../../ui-canvas/types/view.types";
import { ViewProps } from "../../t-core/types/props.types";

export interface CanvasRootProps {
    rootRef?: React.RefObject<HTMLDivElement | null>;
    src: CanvasModel;
}

export interface CanvasGridContainerProps {
    rowCount: number; colCount: number;
    gridSources: CanvasGridModel[];
}

export interface CanvasGridSectionProps {
    src: CanvasGridModel;
}

export interface CanvasGridItemProps {
    src: CanvasGridModel
}

export interface CanvasProviderProps {
    rootRef: React.RefObject<HTMLDivElement | null>;
    metricsId?: string;
    dataSource: StoredCanvasModel | null;
    styleSource: StoredCanvasStyle | null;
    children: React.ReactNode;
}