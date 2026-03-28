import { BreadcrumbsAnimate, BreadcrumbsProps } from "@/src/modules/ui-base/types/breadcrumbs.types";
import { ComponentProps } from "@/src/modules/ui-base/types/components/types";

export interface HeuteLinkedBreadcrumbsProps extends BreadcrumbsProps {
    linkProps?: ComponentProps
}

export interface HeuteAnimatedBreadcrumbsProps extends BreadcrumbsProps {
    delay: number;
    offset: number;
    animate?: BreadcrumbsAnimate;
}