import { BrandIcon } from "../../ui-base/components/Brand";
import { BreadcrumbsItem } from "../../ui-base/types/breadcrumbs.types";
import { HeuteLinkedBreadcrumbs } from "../../ui-shared/components/HeuteBreadcrumbs";
import { useWorkspaceContext } from "../hooks/useWorkspaceContext";

export function WorkspaceBreadcrumbs() {
    const context = useWorkspaceContext();
    const { segmentsResult } = context.metadata;

    const rootItem : BreadcrumbsItem = {
        name: null!,
        href: "/workspace",
        element: () => <BrandIcon/>
    };
    
    const items = segmentsResult.segments.map((segment, index) => ({
        name: segment,
        href: segmentsResult.fullPath + "?display=" + index,
    }));

    return (
        <HeuteLinkedBreadcrumbs
            items={[rootItem, ...items]}
        />
    )
}