import { StoredItem, UserBasedStoreState } from "./store.types";
import { Layout, LayoutData, LayoutSectionData } from "@/src/modules/layout/types/layout.types";

export interface LayoutState extends UserBasedStoreState<StoredLayout> {
    sectionById: Record<string, StoredLayoutSection>;

    loadGlobalLayout: (layout: Layout) => void;
    loadMeLayout: (layout: Layout) => void;
    loadUserLayout: (user: string, layout: Layout) => void;

    getGlobalLayout: (name: string, version: number) => StoredLayout | null;
    getMeLayout: (name: string, version: number) => StoredLayout | null;
    getUserLayout: (user: string, name: string, version: number) => StoredLayout | null;

    getGlobalSectionsByLayout: (name: string, version: number) => StoredLayoutSection[];
    getMeSectionsByLayout: (name: string, version: number) => StoredLayoutSection[];
    getUserSectionsByLayout: (user: string, name: string, version: number) => StoredLayoutSection[];
}

export interface StoredLayout extends StoredItem, LayoutData {

}

export interface StoredLayoutSection extends StoredItem, LayoutSectionData {
    layoutId: () => string;
}