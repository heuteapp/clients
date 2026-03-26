import { Breadcrumbs } from "@/src/modules/ui-base/components/Breadcrumbs"
import { HeuteLinkedBreadcrumbsProps } from "@/src/modules/ui-shared/types/components/heute-breadcrumbs.types"
import { BreadcrumbsItemData } from "@/src/modules/ui-base/types/breadcrumbs.types"
import { HeuteLink } from "./HeuteLink"

export const HeuteLinkedBreadcrumbs = (props: HeuteLinkedBreadcrumbsProps) => {
    const wrapperElement = (item: BreadcrumbsItemData, children: React.ReactNode) => {
        return (
            <HeuteLink
                href={item.href}
            >
                {props.wrapperElement ? props.wrapperElement(item, children) : children}
            </HeuteLink>
        )
    }

    return (
        <Breadcrumbs
            wrapperElement={wrapperElement}
            {...props}
        />
    )
}