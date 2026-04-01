export interface Category {
    name: string;
}

export interface CategoryChain extends Category {
    child?: CategoryChain;
}

export interface CategoryTree extends Category {
    children?: CategoryTree[]
}

export interface CategoryHierarchy {
    roots: CategoryTree[];
}