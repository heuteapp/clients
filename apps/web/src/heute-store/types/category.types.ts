import { Category, CategoryChain, CategoryTree, CategoryHierarchy } from "@/src/modules/category/types/category.types";

//

export interface CategoryState {
    byId: Record<string, StoredCategory>;
    byParentId: Record<string, string[]>;
    rootIds: string[];
    userOrder: string[];

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
    sortMe: () => void;

    hasUser: (user: string) => boolean;

    clearMe: () => void;
    clearUser: (user: string) => void;
}

//

export interface StoredCategory extends Category {
    id: string;
    parentId: string | null;
}