import { LayoutBase, LayoutSectionBase } from "@/src/modules/layout/types/layout.base.types";
import { StoredItem, UserBasedStoreState } from "../store.types";

export interface LayoutBaseState<
    TLayoutSource extends LayoutBaseSource,
    TLayoutItem extends StoredLayoutItem<TLayoutSection>,
    TLayoutItemContent extends StoredLayoutItemContent,
    TLayoutSection extends StoredLayoutSectionItem,
    TLayoutSectionContent extends StoredLayoutSectionItemContent
> extends UserBasedStoreState<TLayoutItemContent> {
    sectionById: Record<string, TLayoutSectionContent>;

    loadGlobalLayout: (layout: TLayoutSource) => void;
    loadMeLayout: (layout: TLayoutSource) => void;
    loadUserLayout: (user: string, layout: TLayoutSource) => void;

    getGlobalLayout: (name: string, version: number) => TLayoutItem | null;
    getMeLayout: (name: string, version: number) => TLayoutItem | null;
    getUserLayout: (user: string, name: string, version: number) => TLayoutItem | null;
}

//

export type LayoutBaseSource = LayoutBase;

export type LayoutSectionBaseSource = LayoutSectionBase;

export interface StoredLayoutItem<TLayoutSection extends StoredLayoutSectionItem> extends StoredItem, LayoutBase {
    sections: TLayoutSection[];
}

export interface StoredLayoutSectionItem extends StoredItem, LayoutSectionBase {
    layoutId: () => string;
}

export type StoredLayoutItemContent = Omit<StoredLayoutItem<StoredLayoutSectionItem>, "sections">;

export type StoredLayoutSectionItemContent = StoredLayoutSectionItem;