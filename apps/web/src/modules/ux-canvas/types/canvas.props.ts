import { StoredCanvasModel, StoredCanvasGridModel, StoredCanvasStyle } from "@/src/heute-store/types/canvas.types";

export interface CanvasRootProps {
    data: StoredCanvasModel;
}

export interface CanvasGridContainerProps {
    rowCount: number;
    colCount: number;
    grids: StoredCanvasGridModel[];
}

export interface CanvasGridSectionProps {
    data: StoredCanvasGridModel
}

export interface CanvasGridItemProps  {
    data: StoredCanvasGridModel
}

export interface CanvasProviderProps {
    rootRef: React.RefObject<HTMLDivElement | null>;
    metricsId?: string;
    dataSource: StoredCanvasModel | null;
    styleSource: StoredCanvasStyle | null;
    children: React.ReactNode;
}