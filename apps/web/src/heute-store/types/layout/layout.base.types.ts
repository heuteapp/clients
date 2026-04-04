import { LayoutBase, LayoutSectionBase } from "@/src/modules/layout/types/layout.base.types";
import { StoredItem, UserBasedStoreState } from "../store.types";

export interface LayoutBaseState<
    TLayoutSource extends LayoutBase,
    TLayoutItem extends StoredLayoutItem,
    TLayoutRoot extends StoredLayoutRootItem<TLayoutSection>,
    TLayoutSection extends StoredLayoutSectionItem
> extends UserBasedStoreState<TLayoutItem> {
    sectionById: Record<string, StoredLayoutSectionItem>;

    loadGlobalLayout: (layout: TLayoutSource) => void;
    loadMeLayout: (layout: TLayoutSource) => void;
    loadUserLayout: (user: string, layout: TLayoutSource) => void;

    getGlobalLayout: (name: string, version: number) => TLayoutRoot | null;
    getMeLayout: (name: string, version: number) => TLayoutRoot | null;
    getUserLayout: (user: string, name: string, version: number) => TLayoutRoot | null;
}

//

export interface StoredLayoutItem extends StoredItem, LayoutBase {

}

export interface StoredLayoutRootItem<TLayoutSection extends StoredLayoutSectionItem> extends StoredLayoutItem {
    sections: TLayoutSection[];
}

export interface StoredLayoutSectionItem extends StoredItem, LayoutSectionBase {
    layoutId: () => string;
}