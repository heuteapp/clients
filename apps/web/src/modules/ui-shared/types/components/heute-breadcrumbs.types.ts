import { BreadcrumbsAnimate, BreadcrumbsItem, BreadcrumbsItemData, BreadcrumbsProps } from "@/src/modules/ui-base/types/breadcrumbs.types";
import { ComponentProps } from "@/src/modules/ui-base/types/components/types";

export interface HeuteLinkedBreadcrumbsProps extends BreadcrumbsProps {
    linkProps?: ComponentProps
}

export interface HeuteAnimatedBreadcrumbsProps extends BreadcrumbsProps {
    items: BreadcrumbsItem[];
    renderItem?: (item: HeuteAnimatedBreadcrumbsItem, index?: number) => React.ReactNode;
    
    delay: number;
    offset: number;
    animate?: BreadcrumbsAnimate;
}

export interface HeuteAnimatedBreadcrumbsItem extends HeuteAnimatedBreadcrumbsItemData {
    render?: (item: HeuteAnimatedBreadcrumbsItemData, index?: number) => React.ReactNode;
}

export interface HeuteAnimatedBreadcrumbsItemData extends BreadcrumbsItemData {

}