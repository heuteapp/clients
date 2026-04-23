import { Category, CategoryChain, CategoryTree, CategoryHierarchy } from "@/src/modules/d-category/types/category.types";
import { StoredItem, UserBasedStoreState } from "./store.types";

//

export interface CategoryState extends UserBasedStoreState<StoredCategory> {
    byParentId: Record<string, string[]>;
    rootIds: string[];

    loadMe: (hierarchy: CategoryHierarchy) => void;
    loadUser: (user: string, hierarchy: CategoryHierarchy) => void;   

    getMeChain: (path: string) => CategoryChain | null;
    getMeTree: (path: string) => CategoryTree | null;
    getMeHierarchy: () => CategoryHierarchy | null;
    getMeRoots: () => StoredCategory[];
    getMeChildren: (parentId: string | null) => StoredCategory[];

    getUserChain: (user: string, path: string) => CategoryChain | null;
    getUserTree: (user: string, path: string) => CategoryTree | null;
    getUserHierarchy: (user: string) => CategoryHierarchy | null;
    getUserRoots: (user: string) => StoredCategory[] | null;
    getUserChildren: (user: string, parentId: string | null) => StoredCategory[] | null;

    initializeCategory: (path: string) => void;
}

//

export interface StoredCategory extends StoredItem, Category {
    parentId: string | null;
}