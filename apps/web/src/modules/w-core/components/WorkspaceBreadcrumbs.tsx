import { useWorkspaceContext } from "../hooks/useWorkspaceContext";
import { HeuteIconOnlyBrand } from "../../ui-core/components/HeuteBrand";
import { HeuteAnimatedBreadcrumbs } from "../../ui-core/components/HeuteBreadcrumbs";
import { HeuteAnimatedBreadcrumbsItem } from "../../ui-core/types/components/heute-breadcrumbs.types";
import Box from "@mui/material/Box";

export function WorkspaceBreadcrumbs() {
    const { breadcrumbs } = useWorkspaceContext();

    const rootItem : HeuteAnimatedBreadcrumbsItem = {
        name: "Home",
        href: "/",
        render: (item) => (
            <HeuteIconOnlyBrand 
                iconSize={24} 
                link={{ href: item.href, linkType: "external" }}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: 32,
                    paddingLeft: "16px",
                }}
            />
        ),
        animate: false
    }

    const items = [rootItem];
    const [navItem, ...restItems] = breadcrumbs.items;
    if(navItem) {
        items.push({
            ...navItem,
            render: (item) => (
                <Box sx={{ display: "flex", justifyContent: "center", width: 92 }}>
                    {navItem.render ? navItem.render(item) : item.name}
                </Box>
            )
        });
        items.push(...restItems);
    }

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