import { Breadcrumbs, BreadcrumbsSeparator } from "@/src/modules/ui-base/components/Breadcrumbs"
import { HeuteAnimatedBreadcrumbsProps, HeuteLinkedBreadcrumbsProps } from "@/src/modules/ui-shared/types/components/heute-breadcrumbs.types"
import { BreadcrumbsItemData } from "@/src/modules/ui-base/types/breadcrumbs.types"
import { HeuteLink } from "./HeuteLink"
import { Box } from "@mui/material"

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

export const HeuteAnimatedBreadcrumbs = ({ delay, offset, animate = true, renderItem, separator, ...props }: HeuteAnimatedBreadcrumbsProps) => {
    const animationStyle = (shouldAnimate: boolean) => ({
        animation: shouldAnimate ? `slideInFromLeft ${delay}s ease-out forwards` : "none",
        opacity: shouldAnimate ? 0 : 1,
        transform: shouldAnimate ? `translateX(-${offset}px)` : "none",
        "@keyframes slideInFromLeft": {
            "0%": {
                opacity: 0,
                transform: `translateX(-${offset}px)`
            },
            "100%": {
                opacity: 1,
                transform: "translateX(0)"
            }
        }
    })

    const shouldAnimate = (animate: BreadcrumbsAnimate, index?: number) => {
        if(typeof animate === "boolean") {
            return animate;
        }

        return index !== undefined ? animate?.[index] : true;
    }
    
    const animationRender = (item: BreadcrumbsItemData, index?: number) => {
        const content = renderItem ? renderItem(item, index) : item.name;

        return (
            <Box sx={animationStyle(shouldAnimate(animate, index))} >
                {content}
            </Box>
        )
    }

    const animationSeparator = (
        <Box sx={animationStyle(shouldAnimate(animate))} >
            {separator ? separator : <BreadcrumbsSeparator />}
        </Box>
    )

    return (
        <Breadcrumbs 
            renderItem={animationRender}
            separator={animationSeparator}
            {...props}
        />
    )
}