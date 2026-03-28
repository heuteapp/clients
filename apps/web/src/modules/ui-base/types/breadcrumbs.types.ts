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

export type BreadcrumbsAnimatedItemProps = {
    children: React.ReactNode;
    animation: BreadcrumbsAnimatedItemAnimation;
    shouldAnimate?: boolean;
    index?: number;
}

export type BreadcrumbsAnimatedItemAnimation = {
    type: 'slide' | 'fade' | 'none';
    direction?: 'left' | 'right' | 'up' | 'down';
    duration?: number;
    offset?: number;
};