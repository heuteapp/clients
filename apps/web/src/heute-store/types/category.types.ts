import { Category, CategoryChain, CategoryTree, CategoryHierarchy } from "@/src/modules/category/types/category.types";

//

export interface CategoryState {
    owners: {   
        [owner: string]: {
            byId: Record<string, StoredCategory>;
            byParentId: Record<string, string[]>;
            rootIds: string[];
        }
    };

    loadOwner: (owner: string, hierarchy: CategoryHierarchy) => void;    
    hasOwner: (owner: string) => boolean;
    clearOwner: (owner: string) => void;

    getChain: (owner: string, path: string) => CategoryChain | null;
    getTree: (owner: string, path: string) => CategoryTree | null;
    getHierarchy: (owner: string) => CategoryHierarchy | null;
}

//

export interface StoredCategory extends Category {
    id: string;
    parentId: string | null;
}