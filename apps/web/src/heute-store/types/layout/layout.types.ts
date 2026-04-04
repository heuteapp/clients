import { LayoutData, LayoutSectionData } from "@/src/modules/layout/types/layout.types";
import { LayoutBaseState, StoredLayoutItem, StoredLayoutRootItem, StoredLayoutSectionItem } from "./layout.base.types";

export interface LayoutState extends LayoutBaseState<StoredLayout, StoredLayoutRoot, StoredLayoutSection> {

}

//

export interface StoredLayout extends StoredLayoutItem, LayoutData {

}

export interface StoredLayoutRoot extends StoredLayout, StoredLayoutRootItem<StoredLayoutSection> {

}

export interface StoredLayoutSection extends StoredLayoutSectionItem, LayoutSectionData {
    layoutId: () => string;
}