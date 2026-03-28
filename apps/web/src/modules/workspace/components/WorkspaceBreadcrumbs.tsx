import { useWorkspaceContext } from "../hooks/useWorkspaceContext";
import { HeuteIconOnlyBrand } from "../../ui-shared/components/HeuteBrand";
import { HeuteAnimatedBreadcrumbs } from "../../ui-shared/components/HeuteBreadcrumbs";
import { HeuteAnimatedBreadcrumbsItem } from "../../ui-shared/types/components/heute-breadcrumbs.types";

export function WorkspaceBreadcrumbs() {
    const context = useWorkspaceContext();
    const { breadcrumbs } = context.metadata;

    const rootItem : HeuteAnimatedBreadcrumbsItem = {
        name: "Home",
        href: "/",
        render: (item) => (
            <HeuteIconOnlyBrand 
                iconSize={24} 
                link={{ href: item.href, linkType: "external" }}
            />
        ),
        animate: false
    }

    const items = [rootItem, ...breadcrumbs.items];
    const animate = breadcrumbs.animate;

    return (
        <HeuteAnimatedBreadcrumbs 
            duration={0.2}
            delay={0}
            offset={10}
            items={items}
            animate={animate}
        />
    )
}