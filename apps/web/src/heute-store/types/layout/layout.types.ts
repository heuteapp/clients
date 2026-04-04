import { LayoutData, LayoutDataContent, LayoutSectionDataContent } from "@/src/modules/layout/types/layout.data.types";
import { LayoutBaseState, StoredLayoutItem, StoredLayoutRootItem, StoredLayoutSectionItem } from "./layout.base.types";

export interface LayoutState extends LayoutBaseState<LayoutData, StoredLayout, StoredLayoutRoot, StoredLayoutSection> {

}

//

export interface StoredLayout extends StoredLayoutItem, LayoutDataContent {

}

export interface StoredLayoutRoot extends StoredLayout, StoredLayoutRootItem<StoredLayoutSection> {

}

export interface StoredLayoutSection extends StoredLayoutSectionItem, LayoutSectionDataContent {
    layoutId: () => string;
}