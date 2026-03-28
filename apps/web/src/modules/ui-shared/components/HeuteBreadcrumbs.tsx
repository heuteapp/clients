import { Breadcrumbs, BreadcrumbsAnimationRender } from "@/src/modules/ui-base/components/Breadcrumbs"
import { HeuteAnimatedBreadcrumbsItem, HeuteAnimatedBreadcrumbsProps, HeuteLinkedBreadcrumbsProps } from "@/src/modules/ui-shared/types/components/heute-breadcrumbs.types"
import { BreadcrumbsItemData } from "@/src/modules/ui-base/types/breadcrumbs.types"
import { HeuteLink } from "./HeuteLink"
import { AnimatePresence, motion } from "framer-motion"

export const HeuteLinkedBreadcrumbs = ({ linkProps, renderItem, ...props }: HeuteLinkedBreadcrumbsProps) => {
    const linkRender = (item: BreadcrumbsItemData, index?: number) => {
         const content = renderItem 
            ? renderItem(item, index)
            : item.name;

        return (
            <HeuteLink
                {...linkProps}
                href={item.href}
            >
                {content}
            </HeuteLink>
        )
    }

    return (
        <Breadcrumbs
            renderItem={linkRender}
            {...props}
        />
    )
}

export const HeuteAnimatedBreadcrumbs = ({ items, renderItem, delay = 0, offset, animate = true, separator, ...props }: HeuteAnimatedBreadcrumbsProps) => {
    const animationRender = (item: HeuteAnimatedBreadcrumbsItem, index?: number) => {
        const content = renderItem 
            ? renderItem(item, index)
            : item.name;

        if (!animate || item.animate === false) {
            return <>{content}</>;
        }

        return (
            <BreadcrumbsAnimationRender duration={0.5} delay={delay}>
                {content}
            </BreadcrumbsAnimationRender>
        )
    }

    return (
        <Breadcrumbs 
            items={items}
            renderItem={animationRender}
            {...props}
        />
    )
}