import { UINode, UIRootNode } from "@/src/modules/ui-base/types/ui.types";
import { BoardRootProps, BoardCardProps, BoardCardContainerProps } from "./board.props";

export interface BoardRootNode extends UIRootNode {
    ref: React.RefObject<HTMLDivElement | null>
    props?: BoardRootProps
    cardContainer?: BoardCardContainerNode
}

export interface BoardCardContainerNode extends UINode {
    props?: BoardCardContainerProps; 
    cards: Map<string, BoardCardNode>
}

export interface BoardCardNode extends UINode {
    props?: BoardCardProps; 
}