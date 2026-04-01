import { StoredCategory } from "@/src/heute-store/types/category.types";

export interface MeCategoryState {
    byId: Map<string, StoredCategory>;
    byParentId: Map<string, string[]>;
    rootIds: string[];
    isLoading: boolean;
    error: string | null;
}