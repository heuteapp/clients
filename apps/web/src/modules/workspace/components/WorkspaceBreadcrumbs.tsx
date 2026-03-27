import { HeuteLinkedBreadcrumbs } from "../../ui-shared/components/HeuteBreadcrumbs";
import { useWorkspaceContext } from "../hooks/useWorkspaceContext";
import { BrandIcon } from "../../ui-base/components/Brand";

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

    const items = [rootItem, ...breadcrumbs.items];

    return (
        <HeuteLinkedBreadcrumbs 
            sx={{
                padding: 1
            }}
            linkProps={{
                sx: {
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    color: "text.primary",
                }
            }}
            items={items}
        />
    )
}