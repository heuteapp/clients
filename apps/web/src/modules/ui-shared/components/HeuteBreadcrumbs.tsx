import { Breadcrumbs } from "@/src/modules/ui-base/components/Breadcrumbs"
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

export const HeuteAnimatedBreadcrumbs = ({ delay, offset, ...props }: HeuteAnimatedBreadcrumbsProps) => {
    return (
        <Box
            sx={{
                '& > * > ol > li': {
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
                },
            }}
        >
            <Breadcrumbs 
                {...props}
            />
        </Box>
    )
}