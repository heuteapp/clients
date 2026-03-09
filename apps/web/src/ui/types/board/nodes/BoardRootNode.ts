import { RegistryBaseNode } from "@/src/ui/types/shared/registry";


export interface BoardRootNode extends RegistryBaseNode {
    ref: React.RefObject<HTMLDivElement | null>
}