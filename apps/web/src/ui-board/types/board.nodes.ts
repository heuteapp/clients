import { RegistryBaseNode } from "@/src/ui/types/shared/registry";
import { BoardRootProps, BoardCardProps, BoardCardContainerProps } from "./board.props";

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