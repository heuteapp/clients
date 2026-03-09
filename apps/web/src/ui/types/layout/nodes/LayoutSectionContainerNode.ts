import { LayoutSectionContainerProps } from "@/src/ui/types/layout/props"
import { RegistryBaseNode } from "@/src/ui/types/shared/registry";
import { LayoutSectionNode } from "./LayoutSectionNode"

export interface LayoutSectionContainerNode extends RegistryBaseNode {
    props?: LayoutSectionContainerProps
    sections: Map<string, LayoutSectionNode>
}
