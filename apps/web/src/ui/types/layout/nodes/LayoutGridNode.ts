import { LayoutGridProps } from "@/src/types/layout/props";
import { RegistryBaseNode } from "@/src/ui/types/shared/registry";
import { LayoutGridCellNode } from "./LayoutGridCellNode";

export interface LayoutGridNode extends RegistryBaseNode {
    props?: LayoutGridProps
    cells: Map<string, LayoutGridCellNode>
}
