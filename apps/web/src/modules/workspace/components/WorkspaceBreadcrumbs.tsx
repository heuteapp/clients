import { Box } from "@mui/material";
import { HeuteIconOnlyBrand } from "../../ui-shared/components/HeuteBrand";
import { HeuteLinkedBreadcrumbs } from "../../ui-shared/components/HeuteBreadcrumbs";
import { useWorkspaceContext } from "../hooks/useWorkspaceContext";
import { BrandIcon } from "../../ui-base/components/Brand";

export function WorkspaceBreadcrumbs() {
    const context = useWorkspaceContext();
    const { segmentsResult } = context.metadata;

    const rootItem = {
        name: "Home",
        href: "/workspace",
        element: () => (
            <BrandIcon 
                size={24}
                sx={{
                    p: 1
                }}
            />
        )
    }

    const segmentItems = segmentsResult.segments.map((segment, index) => ({
        name: segment,
        href: segmentsResult.fullPath + "?display=" + index,
    }));

    const items = [rootItem, ...segmentItems];

    return (
        <>
            <HeuteLinkedBreadcrumbs 
                linkProps={{
                    sx: {
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                    }
                }}
                items={items}
            />
        </>
    )
}