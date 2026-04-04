import { StoredItem, UserBasedStoreState } from "./store.types";
import { Layout, LayoutData, LayoutSectionData } from "@/src/modules/layout/types/layout.types";

export interface LayoutState extends UserBasedStoreState<StoredLayout> {
    sectionById: Record<string, StoredLayoutSection>;

    loadGlobalLayout: (layout: Layout) => void;
    loadMeLayout: (layout: Layout) => void;
    loadUserLayout: (user: string, layout: Layout) => void;

    getGlobalLayout: (name: string, version: number) => StoredLayoutRoot | null;
    getMeLayout: (name: string, version: number) => StoredLayoutRoot | null;
    getUserLayout: (user: string, name: string, version: number) => StoredLayoutRoot | null;
}

//

export interface StoredLayout extends StoredItem, LayoutData {

}

export interface StoredLayoutSection extends StoredItem, LayoutSectionData {
    layoutId: () => string;
}

//

export interface StoredLayoutRoot extends StoredLayout {
    sections: StoredLayoutSection[];
}