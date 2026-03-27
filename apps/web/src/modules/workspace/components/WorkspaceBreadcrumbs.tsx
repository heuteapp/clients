import { useWorkspaceContext } from "../hooks/useWorkspaceContext";
import { BreadcrumbsItem } from "../../ui-base/types/breadcrumbs.types";
import { Breadcrumbs } from "../../ui-base/components/Breadcrumbs";
import { HeuteIconOnlyBrand } from "../../ui-shared/components/HeuteBrand";
import { HeuteAnimatedBreadcrumbs } from "../../ui-shared/components/HeuteBreadcrumbs";

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
        element: () => <HeuteAnimatedBreadcrumbs items={breadcrumbs.items} delay={0.2} offset={10} />
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