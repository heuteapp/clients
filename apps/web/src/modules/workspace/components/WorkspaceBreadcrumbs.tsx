import { BrandIcon } from "../../ui-base/components/Brand";
import { BreadcrumbsItem } from "../../ui-base/types/breadcrumbs.types";
import { HeuteIconOnlyBrand } from "../../ui-shared/components/HeuteBrand";
import { HeuteLinkedBreadcrumbs } from "../../ui-shared/components/HeuteBreadcrumbs";
import { useWorkspaceContext } from "../hooks/useWorkspaceContext";

export function WorkspaceBreadcrumbs() {
    const context = useWorkspaceContext();
    const { segmentsResult } = context.metadata;

    const items = segmentsResult.segments.map((segment, index) => ({
        name: segment,
        href: segmentsResult.fullPath + "?display=" + index,
    }));

    return (
        <>
            <HeuteIconOnlyBrand 
                size={28} 
                link={{ href:"/", linkType: "external" }} 
                style={{
                    padding: 8
                }}
            />
            <HeuteLinkedBreadcrumbs 
                linkProps={{
                    style: {
                        textDecoration: "none",
                        color: "white"
                    }
                }}
                items={items}
            />
        </>
    )
}