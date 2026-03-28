import { ComponentProps } from "./components/types";

export interface BreadcrumbsProps extends ComponentProps {
    items: BreadcrumbsItem[];
    separator?: React.ReactNode;
    renderItem?: (item: BreadcrumbsItemData, index?: number) => React.ReactNode;
}

export interface BreadcrumbsItem extends BreadcrumbsItemData {
    render?: (item: BreadcrumbsItemData, index?: number) => React.ReactNode;
}

export interface BreadcrumbsItemData {
    name: string;
    href?: string;
}

//

export type BreadcrumbsAnimate = boolean | Record<number, boolean>;