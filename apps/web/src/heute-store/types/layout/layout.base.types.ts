import { LayoutBase, LayoutSectionBase } from "@/src/modules/layout/types/layout.base.types";
import { StoredItem, UserBasedStoreState } from "../store.types";

export interface LayoutState<TLayout extends StoredLayoutItem> extends UserBasedStoreState<TLayout> {
    sectionById: Record<string, StoredLayoutSectionItem>;

    loadGlobalLayout: (layout: TLayout) => void;
    loadMeLayout: (layout: TLayout) => void;
    loadUserLayout: (user: string, layout: TLayout) => void;

    getGlobalLayout: (name: string, version: number) => StoredLayoutRootItem | null;
    getMeLayout: (name: string, version: number) => StoredLayoutRootItem | null;
    getUserLayout: (user: string, name: string, version: number) => StoredLayoutRootItem | null;
}

//

export interface StoredLayoutItem extends StoredItem, LayoutBase {

}

export interface StoredLayoutRootItem extends StoredLayoutItem {
    sections: StoredLayoutSectionItem[];
}

export interface StoredLayoutSectionItem extends StoredItem, LayoutSectionBase {
    layoutId: () => string;
}