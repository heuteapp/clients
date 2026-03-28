import { Breadcrumbs, BreadcrumbsSeparator } from "@/src/modules/ui-base/components/Breadcrumbs"
import { HeuteAnimatedBreadcrumbsProps, HeuteLinkedBreadcrumbsProps } from "@/src/modules/ui-shared/types/components/heute-breadcrumbs.types"
import { BreadcrumbsItemData } from "@/src/modules/ui-base/types/breadcrumbs.types"
import { HeuteLink } from "./HeuteLink"
import { Box } from "@mui/material"

export const HeuteLinkedBreadcrumbs = ({ linkProps, renderItem, ...props }: HeuteLinkedBreadcrumbsProps) => {
    const linkRender = (item: BreadcrumbsItemData) => {
        return (
            <HeuteLink
                {...linkProps}
                href={item.href}
            >
                {renderItem ? renderItem(item) : item.name}
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

export const HeuteAnimatedBreadcrumbs = ({ delay, offset, renderItem, separator, ...props }: HeuteAnimatedBreadcrumbsProps) => {
    const animationStyle = {
        animation: `slideInFromLeft ${delay}s ease-out forwards`,
        opacity: 0,
        transform: `translateX(-${offset}px)`,
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
    }
    
    const animationRender = (item: BreadcrumbsItemData) => {
        return (
            <Box sx={animationStyle} >
                {renderItem ? renderItem(item) : item.name}
            </Box>
        )
    }

    const animationSeparator = (
        <Box sx={animationStyle} >
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