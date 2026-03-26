import { Breadcrumbs } from "@/src/modules/ui-base/components/Breadcrumbs"
import { HeuteLinkedBreadcrumbsProps } from "@/src/modules/ui-shared/types/components/heute-breadcrumbs.types"
import { HeuteLink } from "./HeuteLink"

export const HeuteLinkedBreadcrumbs = (props: HeuteLinkedBreadcrumbsProps) => {
    const defaultElement = (name: string, href?: string) => {
        return (
            <HeuteLink
                href={href}
            >
                {props.defaultElement ? props.defaultElement(name, href) : name}
            </HeuteLink>
        )
    }

    return (
        <Breadcrumbs
            defaultElement={defaultElement}
            {...props}
        />
    )
}