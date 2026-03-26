export interface BreadcrumbsProps {
    items: BreadcrumbsItem[];
    defaultElement?: (name: string, href?: string) => React.ReactNode;    
    separator?: React.ReactNode;
}

export interface BreadcrumbsItem {
    name: string;
    href?: string;
    element?: (name: string, href?: string) => React.ReactNode;
}