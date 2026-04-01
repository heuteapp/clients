import { Category } from "@/src/modules/category/types/category.types";

export interface StoredCategory extends Category {
    id: string;
    parentId?: string;
}