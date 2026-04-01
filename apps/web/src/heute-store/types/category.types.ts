import { Category, CategoryHierarchy } from "@/src/modules/category/types/category.types";

//

export interface CategoryState {
    owners: {   
        [owner: string]: {
            byId: Record<string, StoredCategory>;
            byParentId: Record<string, string[]>;
            rootIds: string[];
        }
    };
    loadFromHierarchy: (owner: string, hierarchy: CategoryHierarchy) => void;
    getHierarchy: (owner: string) => CategoryHierarchy | null;
    clearOwner: (owner: string) => void;
}

//

export interface StoredCategory extends Category {
    id: string;
    parentId: string | null;
}