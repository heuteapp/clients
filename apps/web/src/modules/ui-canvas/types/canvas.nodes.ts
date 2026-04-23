import { UINode, UIRootNode } from "@/src/modules/ui-base/types/ui.types";
import { CanvasRootProps, CanvasGridProps, CanvasSectionProps } from "./canvas.props";

export interface CanvasRootNode extends UIRootNode {
    ref: React.RefObject<HTMLDivElement | null>
    props?: CanvasRootProps
    sections: Map<string, CanvasSectionNode>
}
export interface CanvasGridNode extends UINode {
    props?: CanvasGridProps
}

export interface CanvasSectionNode extends UINode {
    props?: CanvasSectionProps
    grid?: CanvasGridNode | null
}