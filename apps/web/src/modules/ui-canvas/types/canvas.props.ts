import { StoredCanvasData, StoredCanvasGridData, StoredCanvasStyle } from "@/src/heute-store/types/canvas.types";

export interface CanvasRootProps {
    data: StoredCanvasData;
}

export interface CanvasGridContainerProps {
    grids: StoredCanvasGridData[];
}

export interface CanvasGridSectionProps {
    data: StoredCanvasGridData
}

export interface CanvasGridItemProps  {
    data: StoredCanvasGridData
}

export interface CanvasProviderProps {
    rootRef: React.RefObject<HTMLDivElement | null>;
    metricsId?: string;
    dataSource: StoredCanvasData | null;
    styleSource: StoredCanvasStyle | null;
    children: React.ReactNode;
}