import { RegistryBaseNode } from "@/src/ui/types/shared/registry";
import { BoardRootProps, BoardCardProps, BoardCardContainerProps, BoardLayoutRootProps, BoardLayoutGridProps, BoardLayoutSectionProps } from "./board.props";

export interface BoardRootNode extends RegistryBaseNode {
    ref: React.RefObject<HTMLDivElement | null>
    props?: BoardRootProps
    cardContainer?: BoardCardContainerNode
}

export interface BoardCardContainerNode extends RegistryBaseNode {
    props?: BoardCardContainerProps; 
    cards: Map<string, BoardCardNode>
}

export interface BoardCardNode extends RegistryBaseNode {
    props?: BoardCardProps; 
}

export interface BoardLayoutRootNode extends RegistryBaseNode {
    ref: React.RefObject<HTMLDivElement | null>
    props?: BoardLayoutRootProps
    sections: Map<string, BoardLayoutSectionNode>
}
export interface BoardLayoutGridNode extends RegistryBaseNode {
    props?: BoardLayoutGridProps
}

export interface BoardLayoutSectionNode extends RegistryBaseNode {
    props?: BoardLayoutSectionProps
    grid?: BoardLayoutGridNode | null
}