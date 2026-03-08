import { RegistryBaseNode } from "@/src/shared/types/registry"
import { HeuteLayoutProps, LayoutSectionProps, LayoutGridProps, LayoutGridCellProps } from "./props"

export interface LayoutRootNode extends RegistryBaseNode {
    props?: HeuteLayoutProps
    sectionContainer: LayoutSectionContainerNode | null
}

export interface LayoutSectionContainerNode extends RegistryBaseNode {
    sections: Map<string, LayoutSectionNode>
}

export interface LayoutSectionNode extends RegistryBaseNode {
    props?: LayoutSectionProps
    grid: LayoutGridNode | null
}

export interface LayoutGridNode extends RegistryBaseNode {
    props?: LayoutGridProps
    cells: Map<string, LayoutGridCellNode>
}

export interface LayoutGridCellNode extends RegistryBaseNode {
    props?: LayoutGridCellProps
}