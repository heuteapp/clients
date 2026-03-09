import { RegistryBaseNode } from "@/src/ui/types/shared/registry";
import { HeuteBoardProps, BoardCardProps, BoardCardContainerProps } from "./props";

export interface BoardRootNode extends RegistryBaseNode {
    ref: React.RefObject<HTMLDivElement | null>
    props?: HeuteBoardProps
    cardContainer?: BoardCardContainerNode
}

export interface BoardCardContainerNode extends RegistryBaseNode {
    props?: BoardCardContainerProps; 
    cards: Map<string, BoardCardNode>
}

export interface BoardCardNode extends RegistryBaseNode {
    props?: BoardCardProps; 
}