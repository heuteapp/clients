import { useWorkspaceContext } from "../hooks/useWorkspaceContext";
import { BreadcrumbsItem } from "../../ui-base/types/breadcrumbs.types";
import { Breadcrumbs } from "../../ui-base/components/Breadcrumbs";
import { HeuteIconOnlyBrand } from "../../ui-shared/components/HeuteBrand";

export function WorkspaceBreadcrumbs() {
    const context = useWorkspaceContext();
    const { breadcrumbs } = context.metadata;

    const rootItem : BreadcrumbsItem = {
        name: "Home",
        href: "/",
        element: (item) => (
            <HeuteIconOnlyBrand 
                iconSize={24} 
                link={{ href: item.href, linkType: "external" }}
            />
        )
    }

    const items = [rootItem, {
        name: "animated",
        element: () => <AnimatedBreadcrumbItems items={breadcrumbs.items} />
    }];

    return (
        <Breadcrumbs 
            sx={{
                padding: 1
            }}
            items={items}
        />
    )
}

const AnimatedBreadcrumbItems = ({ items } : { items: BreadcrumbsItem[]}) => {
    return (
        <Breadcrumbs 
            sx={{
                padding: 1,                    
                '& > ol > li': {
                    animation: "slideInFromLeft 0.2s ease-out forwards",
                    opacity: 0,
                    transform: "translateX(-10px)",
                    "@keyframes slideInFromLeft": {
                        "0%": {
                            opacity: 0,
                            transform: "translateX(-10px)"
                        },
                        "100%": {
                            opacity: 1,
                            transform: "translateX(0)"
                        }
                    }
                }
            }}
            items={items}
        />
    )
}