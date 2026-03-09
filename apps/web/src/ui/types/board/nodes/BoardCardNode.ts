import { BoardCardProps } from "@/src/ui/components/board/BoardCard";
import { RegistryBaseNode } from "@/src/ui/types/shared/registry";

export interface BoardCardNode extends RegistryBaseNode {
    props?: BoardCardProps; 
}