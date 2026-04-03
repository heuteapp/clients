import { LayoutEntity, LayoutSectionEntity } from "@/src/modules/ui-layout/types/layout.entity";
import { StoredLayoutResult, StoredLayoutSection } from "@/src/heute-store/types/layout.types";

export interface LayoutRootProps extends LayoutEntity {
    data: StoredLayoutResult;
}

export interface LayoutSectionProps extends LayoutSectionEntity {
    data: StoredLayoutSection
}

export interface LayoutGridProps  {
    sectionId: string,
    colSpan: number,
    rowSpan: number,
}