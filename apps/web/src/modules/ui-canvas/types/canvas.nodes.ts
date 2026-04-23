import { UINode, UIRootNode } from "@/src/modules/ui-base/types/ui.types";
import { CanvasRootProps, CanvasGridItemProps, CanvasGridSectionProps, CanvasGridContainerProps } from "./canvas.props";

export interface CanvasRootNode extends UIRootNode {
    ref: React.RefObject<HTMLDivElement | null>
    props?: CanvasRootProps,
    container?: CanvasGridContainerNode | null
}

export interface CanvasGridContainerNode extends UINode {
    props?: CanvasGridContainerProps
    sections: Map<string, CanvasGridSectionNode>
}

export interface CanvasGridSectionNode extends UINode {
    props?: CanvasGridSectionProps
    item?: CanvasGridItemNode | null
}

export interface CanvasGridItemNode extends UINode {
    props?: CanvasGridItemProps
}