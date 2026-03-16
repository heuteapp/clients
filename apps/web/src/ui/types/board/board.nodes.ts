import { RegistryBaseNode } from "@/src/ui/types/shared/registry";
import { BoardProps, BoardCardProps, BoardCardContainerProps } from "./board.props";

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