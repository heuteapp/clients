import { RegistryBaseNode } from "@/src/ui/types/shared/registry";
import { LayoutRootProps, LayoutGridProps, LayoutSectionProps } from "./layout.props";

export interface LayoutRootNode extends RegistryBaseNode {
    ref: React.RefObject<HTMLDivElement | null>
    props?: LayoutRootProps
    sections: Map<string, LayoutSectionNode>
}
export interface LayoutGridNode extends RegistryBaseNode {
    props?: LayoutGridProps
}

export interface LayoutSectionNode extends RegistryBaseNode {
    props?: LayoutSectionProps
    grid?: LayoutGridNode | null
}