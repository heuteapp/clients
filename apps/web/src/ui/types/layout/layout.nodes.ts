import { Identifier } from "@/src/core/types/shared/data"
import { RegistryBaseNode } from "../shared/registry"
import { HeuteLayoutProps, LayoutGridProps, LayoutSectionProps } from "./layout.props"

export interface LayoutRootNode extends RegistryBaseNode {
    ref: React.RefObject<HTMLDivElement | null>
    props?: HeuteLayoutProps
    sections: Map<string, LayoutSectionNode>
}
export interface LayoutGridNode extends RegistryBaseNode {
    props?: LayoutGridProps
}

export interface LayoutSectionNode extends RegistryBaseNode {
    props?: LayoutSectionProps
    grid?: LayoutGridNode | null
}