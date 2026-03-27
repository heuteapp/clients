import { Breadcrumbs } from "@/src/modules/ui-base/components/Breadcrumbs"
import { HeuteAnimatedBreadcrumbsProps, HeuteLinkedBreadcrumbsProps } from "@/src/modules/ui-shared/types/components/heute-breadcrumbs.types"
import { BreadcrumbsItemData } from "@/src/modules/ui-base/types/breadcrumbs.types"
import { HeuteLink } from "./HeuteLink"

export const HeuteLinkedBreadcrumbs = ({ linkProps, wrapperElement, ...props }: HeuteLinkedBreadcrumbsProps) => {
    const linkWrapper = (item: BreadcrumbsItemData, children: React.ReactNode) => {
        return (
            <HeuteLink
                {...linkProps}
                href={item.href}
            >
                {wrapperElement ? wrapperElement(item, children) : children}
            </HeuteLink>
        )
    }

    return (
        <Breadcrumbs
            wrapperElement={linkWrapper}
            {...props}
        />
    )
}

export const HeuteAnimatedBreadcrumbs = ({ delay, offset, ...props }: HeuteAnimatedBreadcrumbsProps) => {
    return (
        <Breadcrumbs 
            {...props}
            sx={{
                padding: 1,                    
                '& > ol > li': {
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
                },                ...props.sx,

            }}
        />
    )
}