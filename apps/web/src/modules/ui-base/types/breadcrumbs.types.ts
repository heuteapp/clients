export interface BreadcrumbsBaseProps {
    items: BreadcrumbsItem[];
    seperator?: React.ReactNode;
}

export interface BreadcrumbsProps extends BreadcrumbsBaseProps {
    defaultElement?: (name: string, href?: string) => React.ReactNode;
}

export interface BreadcrumbsItem {
    name: string;
    href?: string;
    element?: (name: string, href?: string) => React.ReactNode;
}