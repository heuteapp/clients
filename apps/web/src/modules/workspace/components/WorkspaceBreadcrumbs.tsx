import { useWorkspaceContext } from "../hooks/useWorkspaceContext";
import { BrandIcon } from "../../ui-base/components/Brand";
import { BreadcrumbsItem } from "../../ui-base/types/breadcrumbs.types";
import { Breadcrumbs } from "../../ui-base/components/Breadcrumbs";

export function WorkspaceBreadcrumbs() {
    const context = useWorkspaceContext();
    const { breadcrumbs } = context.metadata;

    const rootItem = {
        name: "Home",
        href: "/",
        element: () => (
            <BrandIcon 
                size={24}
            />
        )
    }

    const items = [rootItem, {
        name: "injected",
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
                li: {
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