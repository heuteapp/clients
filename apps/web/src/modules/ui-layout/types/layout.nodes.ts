import { UINode, UIRootNode } from "@/src/modules/ui-base/types/ui.types";
import { LayoutRootProps, LayoutGridProps, LayoutSectionProps } from "./layout.props";

export interface LayoutRootNode extends UIRootNode {
    ref: React.RefObject<HTMLDivElement | null>
    props?: LayoutRootProps
    sections: Map<string, LayoutSectionNode>
}
export interface LayoutGridNode extends UINode {
    props?: LayoutGridProps
}

export interface LayoutSectionNode extends UINode {
    props?: LayoutSectionProps
    grid?: LayoutGridNode | null
}