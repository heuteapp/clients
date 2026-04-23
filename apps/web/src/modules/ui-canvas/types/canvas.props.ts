import { StoredCanvasData, StoredCanvasSectionData, StoredCanvasStyle } from "@/src/heute-store/types/canvas.types";

export interface CanvasRootProps {
    data: StoredCanvasData;
}

export interface CanvasGridContainerProps {
    grids: StoredCanvasSectionData[];
}

export interface CanvasSectionProps {
    data: StoredCanvasSectionData
}

export interface CanvasGridProps  {
    sectionId: string,
    colSpan: number,
    rowSpan: number,
}

export interface CanvasProviderProps {
    rootRef: React.RefObject<HTMLDivElement | null>;
    metricsId?: string;
    dataSource: StoredCanvasData | null;
    styleSource: StoredCanvasStyle | null;
    children: React.ReactNode;
}