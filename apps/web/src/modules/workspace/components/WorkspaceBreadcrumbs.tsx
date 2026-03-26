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
                link={{ href:"/", linkType: "external" }} 
                iconSize={28} 
                iconProps={{
                    sx: {
                        padding: 1
                    }
                }}
            />
            <HeuteLinkedBreadcrumbs 
                linkProps={{
                    sx: {
                        textDecoration: "none"
                    }
                }}
                items={items}
            />
        </>
    )
}