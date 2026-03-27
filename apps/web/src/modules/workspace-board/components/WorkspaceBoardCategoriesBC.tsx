import { Breadcrumbs } from "@/src/modules/ui-base/components/Breadcrumbs";
import { useWorkspaceBoardContext } from "@/src/modules/workspace-board/hooks/useWorkspaceBoardContext";

export function WorkspaceBoardCategoriesBC() {
    const context = useWorkspaceBoardContext();
    const { categories } = context.metadata;

    const categoryItems = categories.map((category) => ({
        name: category,
    }));

    return (
        <Breadcrumbs items={categoryItems} />
    )
}