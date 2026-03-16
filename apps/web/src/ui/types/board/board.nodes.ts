import { RegistryBaseNode } from "@/src/ui/types/shared/registry";
import { BoardProps, BoardCardProps, BoardCardContainerProps, BoardLayoutProps, BoardLayoutGridProps, BoardLayoutSectionProps } from "./board.props";

export interface BoardRootNode extends RegistryBaseNode {
    ref: React.RefObject<HTMLDivElement | null>
    props?: BoardProps
    cardContainer?: BoardCardContainerNode
}

export interface BoardCardContainerNode extends RegistryBaseNode {
    props?: BoardCardContainerProps; 
    cards: Map<string, BoardCardNode>
}

export interface BoardCardNode extends RegistryBaseNode {
    props?: BoardCardProps; 
}

export interface LayoutRootNode extends RegistryBaseNode {
    ref: React.RefObject<HTMLDivElement | null>
    props?: BoardLayoutProps
    sections: Map<string, LayoutSectionNode>
}
export interface LayoutGridNode extends RegistryBaseNode {
    props?: BoardLayoutGridProps
}

export interface LayoutSectionNode extends RegistryBaseNode {
    props?: BoardLayoutSectionProps
    grid?: LayoutGridNode | null
}