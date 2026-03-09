import { RegistryBaseNode } from "../shared/registry"
import { HeuteLayoutProps, LayoutSectionContainerProps, LayoutGridProps, LayoutSectionProps, LayoutGridCellProps } from "./layout.props"

export interface LayoutRootNode extends RegistryBaseNode {
    ref: React.RefObject<HTMLDivElement | null>
    props?: HeuteLayoutProps
    sectionContainer?: LayoutSectionContainerNode | null
}

export interface LayoutSectionContainerNode extends RegistryBaseNode {
    props?: LayoutSectionContainerProps
    sections: Map<string, LayoutSectionNode>
}

export interface LayoutGridNode extends RegistryBaseNode {
    props?: LayoutGridProps
    cells: Map<string, LayoutGridCellNode>
}

export interface LayoutSectionNode extends RegistryBaseNode {
    props?: LayoutSectionProps
    grid?: LayoutGridNode | null
}

export interface LayoutGridCellNode extends RegistryBaseNode {
    props?: LayoutGridCellProps
}