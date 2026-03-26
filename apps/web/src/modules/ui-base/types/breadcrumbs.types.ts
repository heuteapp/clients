export interface BreadcrumbsProps {
    items: BreadcrumbsItem[];
}

export interface BreadcrumbsItem {
    name: string;
    onClick?: () => void;
}