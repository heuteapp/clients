import { LayoutBase, LayoutSectionBase } from "@/src/modules/layout/types/layout.base.types";
import { StoredItem, UserBasedStoreState } from "./store.types";

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

//

import { LayoutData, LayoutDataContent, LayoutSectionDataContent } from "@/src/modules/layout/types/layout.data.types";

export interface LayoutDataState extends LayoutBaseState<
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

//

import { LayoutSectionStyleContent, LayoutStyle, LayoutStyleContent } from "@/src/modules/layout/types/layout.style.types";

export interface LayoutStyleState extends LayoutBaseState<
    LayoutStyle, 
    StoredLayoutStyle, 
    StoredLayoutStyleContent,
    StoredLayoutSectionStyle,
    StoredLayoutSectionStyleContent> {

}

//

export interface StoredLayoutStyle extends StoredLayoutItem<StoredLayoutSectionStyle>, LayoutStyleContent {

}

export interface StoredLayoutSectionStyle extends StoredLayoutSectionItem, LayoutSectionStyleContent {

}

export type StoredLayoutStyleContent = Omit<StoredLayoutStyle, "sections">;

export type StoredLayoutSectionStyleContent = StoredLayoutSectionStyle;