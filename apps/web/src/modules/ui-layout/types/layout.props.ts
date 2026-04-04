import { StoredLayoutData, StoredLayoutSectionData } from "@/src/heute-store/types/layout.types";

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
    source: StoredLayoutData | null;
    children: React.ReactNode;
}