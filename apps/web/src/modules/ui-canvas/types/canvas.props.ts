import { StoredCanvasData, StoredCanvasSectionData, StoredCanvasStyle } from "@/src/heute-store/types/canvas.types";

export interface CanvasRootProps {
    data: StoredCanvasData;
}

export interface CanvasGridContainerProps {
    grids: StoredCanvasSectionData[];
}

export interface CanvasGridSectionProps {
    data: StoredCanvasSectionData
}

export interface CanvasGridItemProps  {
    data: StoredCanvasSectionData
}

export interface CanvasProviderProps {
    rootRef: React.RefObject<HTMLDivElement | null>;
    metricsId?: string;
    dataSource: StoredCanvasData | null;
    styleSource: StoredCanvasStyle | null;
    children: React.ReactNode;
}