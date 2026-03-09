import { HeuteLayoutProps } from "@/src/types/layout/props"
import { RegistryBaseNode } from "@/src/ui/types/shared/registry";
import { LayoutSectionContainerNode } from "./LayoutSectionContainerNode"

export interface LayoutRootNode extends RegistryBaseNode {
    ref: React.RefObject<HTMLDivElement | null>
    props?: HeuteLayoutProps
    sectionContainer?: LayoutSectionContainerNode | null
}