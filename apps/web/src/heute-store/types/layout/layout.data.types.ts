import { LayoutData, LayoutDataContent, LayoutSectionDataContent } from "@/src/modules/layout/types/layout.data.types";
import { LayoutBaseState, StoredLayoutItemContent, StoredLayoutItem, StoredLayoutSectionItem } from "./layout.base.types";

export interface LayoutState extends LayoutBaseState<
    LayoutData, 
    StoredLayoutData, 
    StoredLayoutDataContent, 
    StoredLayoutSectionData,
    StoredLayoutSectionDataContent> {

}

//

export interface StoredLayoutData extends StoredLayoutItem<StoredLayoutSectionData>, LayoutDataContent {

}

export interface StoredLayoutSectionData extends StoredLayoutSectionItem, LayoutSectionDataContent {

}

export type StoredLayoutDataContent = Omit<StoredLayoutData, "sections">;

export type StoredLayoutSectionDataContent = StoredLayoutSectionData;