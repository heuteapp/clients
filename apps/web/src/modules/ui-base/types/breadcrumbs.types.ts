export interface BreadcrumbsProps {
    items: BreadcrumbsItem[];
    defaultElement?: (name: string) => React.ReactNode;
}

export interface BreadcrumbsItem {
    name: string;
    element?: (name: string) => React.ReactNode;
}