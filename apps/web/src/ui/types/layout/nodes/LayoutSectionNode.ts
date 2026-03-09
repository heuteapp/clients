import { RegistryBaseNode } from "@/src/ui/types/shared/registry";
import { LayoutGridNode } from "./LayoutGridNode";
import { LayoutSectionProps } from "@/src/ui/types/layout/props";

export interface LayoutSectionNode extends RegistryBaseNode {
    props?: LayoutSectionProps
    grid?: LayoutGridNode | null
}
