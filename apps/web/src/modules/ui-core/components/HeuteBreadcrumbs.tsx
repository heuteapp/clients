import { Breadcrumbs, BreadcrumbsAnimationRender, BreadcrumbsSeparator } from "@/src/modules/ui-base/components/Breadcrumbs"
import { HeuteAnimatedBreadcrumbsItem, HeuteAnimatedBreadcrumbsProps, HeuteLinkedBreadcrumbsProps } from "@/src/modules/ui-core/types/components/heute-breadcrumbs.types"
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

export const HeuteAnimatedBreadcrumbs = ({ items, renderItem, duration, delay = 0, offset, animate = true, separator, ...props }: HeuteAnimatedBreadcrumbsProps) => {
    const animationRender = (item: HeuteAnimatedBreadcrumbsItem, index?: number) => {
        const content = renderItem 
            ? renderItem(item, index)
            : item.name;

        if (!animate || item.animate === false) {
            return <>{content}</>;
        }

        return (
            <BreadcrumbsAnimationRender duration={duration} delay={delay}>
                {content}
            </BreadcrumbsAnimationRender>
        )
    }

    const animatedSeparator = (
        <BreadcrumbsAnimationRender duration={duration} delay={delay}>
            {separator ? separator : <BreadcrumbsSeparator />}
        </BreadcrumbsAnimationRender>
    )

    return (
        <Breadcrumbs 
            items={items}
            renderItem={animationRender}
            separator={animatedSeparator}
            {...props}
        />
    )
}