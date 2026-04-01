import { Category, CategoryChain, CategoryTree, CategoryHierarchy } from "@/src/modules/category/types/category.types";

//

export interface CategoryState {
    me: CategoryOwnerData | null;
    users: {   
        [user: string]: CategoryOwnerData
    };
    userOrder: string[];

    loadMe: (hierarchy: CategoryHierarchy) => void;
    loadUser: (user: string, hierarchy: CategoryHierarchy) => void;   

    getMeChain: (path: string) => CategoryChain | null;
    getMeTree: (path: string) => CategoryTree | null;
    getMeHierarchy: () => CategoryHierarchy | null;

    getUserChain: (user: string, path: string) => CategoryChain | null;
    getUserTree: (user: string, path: string) => CategoryTree | null;
    getUserHierarchy: (user: string) => CategoryHierarchy | null;

    hasUser: (user: string) => boolean;

    clearMe: () => void;
    clearUser: (user: string) => void;
}

export interface CategoryOwnerData {
    byId: Record<string, StoredCategory>;
    byParentId: Record<string, string[]>;
    rootIds: string[];
}

//

export interface StoredCategory extends Category {
    id: string;
    parentId: string | null;
}