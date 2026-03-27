import { Breadcrumbs } from "@/src/modules/ui-base/components/Breadcrumbs";
import { useWorkspaceBoardContext } from "@/src/modules/workspace-board/hooks/useWorkspaceBoardContext";

export function WorkspaceBoardCategoriesBC() {
    const context = useWorkspaceBoardContext();
    const { categories } = context.metadata;

    const categoryItems = categories.map((category) => ({
        name: category,
    }));

    return (
        <Breadcrumbs 
            items={categoryItems} 
            sx={{
                '& .MuiBreadcrumbs-separator': {
                    marginX: 1
                },
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
                px: 1,
                userSelect: "none",
            }}
            separator=">"
        />
    )
}