import { RegistryBaseNode } from "@/src/ui/types/shared/registry";
import { BoardCardContainerNode } from "./BoardCardContainerNode";
import { HeuteBoardProps } from "../props";


export interface BoardRootNode extends RegistryBaseNode {
    ref: React.RefObject<HTMLDivElement | null>
    props?: HeuteBoardProps
    cardContainer?: BoardCardContainerNode
}