import { Breadcrumbs } from "@/src/modules/ui-base/components/Breadcrumbs"
import { HeuteLinkedBreadcrumbsProps } from "@/src/modules/ui-shared/types/components/heute-breadcrumbs.types"
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