import { RegistryBaseNode } from "@/src/ui/types/shared/registry";
import { BoardCardContainerNode } from "./BoardCardContainerNode";


export interface BoardRootNode extends RegistryBaseNode {
    ref: React.RefObject<HTMLDivElement | null>
    cardContainer?: BoardCardContainerNode
}