export interface BreadcrumbsProps {
    items: BreadcrumbsItem[];    
    separator?: React.ReactNode;
    wrapperElement?: (item: BreadcrumbsItemData, children: React.ReactNode) => React.ReactNode;
    defaultElement?: (item: BreadcrumbsItemData) => React.ReactNode;    
}

export interface BreadcrumbsItem extends BreadcrumbsItemData {
    element?: (item: BreadcrumbsItemData) => React.ReactNode;
}

export interface BreadcrumbsItemData {
    name: string;
    href?: string;
}