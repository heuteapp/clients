import { Category, CategoryHierarchy } from "@/src/modules/category/types/category.types";

//

export interface CategoryState {
    byId: Map<string, StoredCategory>;
    byParentId: Map<string, string[]>;
    rootIds: string[];

    loadFromHierarchy: (hierarchy: CategoryHierarchy) => void;
}

//

export interface StoredCategory extends Category {
    id: string;
    parentId: string | null;
}