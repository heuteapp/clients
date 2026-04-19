import { StoredLayoutData, StoredLayoutSectionData, StoredLayoutStyle } from "@/src/heute-store/types/layout.types";

export interface LayoutRootProps {
    data: StoredLayoutData;
}

export interface LayoutSectionProps {
    data: StoredLayoutSectionData
}

export interface LayoutGridProps  {
    sectionId: string,
    colSpan: number,
    rowSpan: number,
}

export interface LayoutProviderProps {
    rootRef: React.RefObject<HTMLDivElement | null>;
    metricsId?: string;
    dataSource: StoredLayoutData | null;
    styleSource: StoredLayoutStyle | null;
    children: React.ReactNode;
}