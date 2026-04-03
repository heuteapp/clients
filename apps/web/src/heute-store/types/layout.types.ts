import { StoredItem, UserBasedStoreState } from "./store.types";
import { Layout, LayoutData, LayoutSectionData } from "@/src/modules/layout/types/layout.types";

export interface LayoutState extends UserBasedStoreState<StoredLayout> {
    sectionById: Record<string, StoredLayoutSection>;

    loadGlobalLayout: (layout: Layout) => void;
    loadMeLayout: (layout: Layout) => void;
    loadUserLayout: (user: string, layout: Layout) => void;

    getGlobalLayout: (name: string) => StoredLayout | null;
    getMeLayout: (name: string) => StoredLayout | null;
    getUserLayout: (user: string, name: string) => StoredLayout | null;

    getGlobalSectionsByLayout: (name: string) => StoredLayoutSection[];
    getMeSectionsByLayout: (name: string) => StoredLayoutSection[];
    getUserSectionsByLayout: (user: string, name: string) => StoredLayoutSection[];
}

export interface StoredLayout extends StoredItem, LayoutData {

}

export interface StoredLayoutSection extends StoredItem, LayoutSectionData {
    layoutId: () => string;
}