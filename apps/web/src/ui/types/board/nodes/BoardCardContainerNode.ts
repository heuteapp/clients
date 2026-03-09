import { RegistryBaseNode } from "@/src/ui/types/shared/registry";
import { BoardCardNode } from "./BoardCardNode";
import { BoardCardContainerProps } from "@/src/ui/types/board/props";

export interface BoardCardContainerNode extends RegistryBaseNode {
    props?: BoardCardContainerProps; 
    cards: Map<string, BoardCardNode>
}