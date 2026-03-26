export interface BreadcrumbsProps {
    items: BreadcrumbsItem[];
    defaultElement?: (name: string) => React.ReactNode;
    separator?: React.ReactNode;
}

export interface BreadcrumbsItem {
    name: string;
    element?: (name: string) => React.ReactNode;
}