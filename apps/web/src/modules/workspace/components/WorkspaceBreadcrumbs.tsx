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
        render: (item) => (
            <HeuteIconOnlyBrand 
                iconSize={24} 
                link={{ href: item.href, linkType: "external" }}
            />
        )
    }

    const items = [rootItem, ...breadcrumbs.items];

    return (
        <HeuteAnimatedBreadcrumbs 
            delay={0.2}
            offset={10}
            items={items}
            renderItem={() => (
                <span>test</span>
    )}
        />
    )
}