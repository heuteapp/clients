import { StoredCategory } from "@/src/heute-store/types/category.types";

export interface CategoriesBreadcrumbProps {
    categories: string[];
}

export interface CategoryMenuProps {
    anchor: AnchorRef;
}

export interface CategoryTreeViewProps {
    anchor: AnchorRef;
}

export interface CategoryTreeItemProps {
    category: StoredCategory;
    getMeChildren: (parentId: string | null) => StoredCategory[];
    onSelect: (categoryId: string) => void;
}

//

export interface AnchorRef { 
    value: HTMLElement | null; 
    set: (el: HTMLElement | null) => void 
}