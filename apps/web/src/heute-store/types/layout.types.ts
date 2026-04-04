import { StoredItem, UserBasedStoreState } from "./store.types";
import { LayoutData, LayoutDataContent, LayoutSectionDataContent } from "@/src/modules/layout/types/layout.data.types";

export interface LayoutState extends UserBasedStoreState<StoredLayout> {
    sectionById: Record<string, StoredLayoutSection>;

    loadGlobalLayout: (layout: LayoutData) => void;
    loadMeLayout: (layout: LayoutData) => void;
    loadUserLayout: (user: string, layout: LayoutData) => void;

    getGlobalLayout: (name: string, version: number) => StoredLayoutRoot | null;
    getMeLayout: (name: string, version: number) => StoredLayoutRoot | null;
    getUserLayout: (user: string, name: string, version: number) => StoredLayoutRoot | null;
}

//

export interface StoredLayout extends StoredItem, LayoutDataContent {

}

export interface StoredLayoutRoot extends StoredLayout {
    sections: StoredLayoutSection[];
}

export interface StoredLayoutSection extends StoredItem, LayoutSectionDataContent {
    layoutId: () => string;
}