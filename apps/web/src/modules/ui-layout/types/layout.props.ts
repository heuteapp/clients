import { StoredLayoutRoot, StoredLayoutSection } from "@/src/heute-store/types/layout.types";

export interface LayoutRootProps {
    data: StoredLayoutRoot;
}

export interface LayoutSectionProps {
    data: StoredLayoutSection
}

export interface LayoutGridProps  {
    sectionId: string,
    colSpan: number,
    rowSpan: number,
}

export interface LayoutProviderProps {
    source: StoredLayoutRoot | null;
    children: React.ReactNode;
}