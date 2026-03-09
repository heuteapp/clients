import { RegistryBaseNode } from "@/src/types/shared/registry"
import { HeuteLayoutProps, LayoutSectionProps, LayoutGridProps, LayoutGridCellProps, LayoutSectionContainerProps } from "./props"

export interface LayoutRootNode extends RegistryBaseNode {
    ref: React.RefObject<HTMLDivElement | null>
    props?: HeuteLayoutProps
    sectionContainer?: LayoutSectionContainerNode | null
}

export interface LayoutSectionContainerNode extends RegistryBaseNode {
    props?: LayoutSectionContainerProps
    sections: Map<string, LayoutSectionNode>
}

export interface LayoutSectionNode extends RegistryBaseNode {
    props?: LayoutSectionProps
    grid?: LayoutGridNode | null
}

export interface LayoutGridNode extends RegistryBaseNode {
    props?: LayoutGridProps
    cells: Map<string, LayoutGridCellNode>
}

export interface LayoutGridCellNode extends RegistryBaseNode {
    props?: LayoutGridCellProps
}