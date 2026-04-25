import { StoredCanvasModel, StoredCanvasGridModel, StoredCanvasStyle } from "@/src/heute-store/types/canvas.types";

export interface CanvasRootProps {
    rootRef?: React.RefObject<HTMLDivElement | null>;
    src: StoredCanvasModel;
}

export interface CanvasGridContainerProps {
    rowCount: number; colCount: number;
    gridSources: StoredCanvasGridModel[];
}

export interface CanvasGridSectionProps {
    src: StoredCanvasGridModel
}

export interface CanvasGridItemProps  {
    src: StoredCanvasGridModel
}

export interface CanvasProviderProps {
    rootRef: React.RefObject<HTMLDivElement | null>;
    metricsId?: string;
    dataSource: StoredCanvasModel | null;
    styleSource: StoredCanvasStyle | null;
    children: React.ReactNode;
}