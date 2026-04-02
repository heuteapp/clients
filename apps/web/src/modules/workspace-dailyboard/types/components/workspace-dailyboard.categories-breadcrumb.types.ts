export interface CategoriesBreadcrumbProps {
    categories: string[];
}

export interface CategoryMenuProps {
    breadcrumb: BreadcrumbRef;
}

export interface CategoryTreeViewProps {
    breadcrumb: BreadcrumbRef;
}

export interface CategoryTreeItemProps {
    category: string;
    getMeChildren: (category: string) => string[];
    onSelect: (categoryId: string) => void;
}

//

export interface BreadcrumbRef { 
    value: HTMLElement | null; 
    set: (el: HTMLElement | null) => void 
}