import { CanvasRootNode, CanvasSectionNode, CanvasGridNode } from "./canvas.nodes"
import { CanvasRootProps, CanvasSectionProps, CanvasGridProps } from "./canvas.props"

export interface CanvasRegistry {
    canvas: CanvasRootNode

    registerCanvas(
        ref: React.RefObject<HTMLDivElement | null>,
        props: CanvasRootProps,
    ): CanvasRootNode

    registerCanvasSection(
        id: string,
        ref: React.RefObject<HTMLDivElement | null>,
        props: CanvasSectionProps
    ): CanvasSectionNode

    registerCanvasGrid(
        sectionId: string,
        ref: React.RefObject<HTMLDivElement | null>,
        props: CanvasGridProps
    ): CanvasGridNode

    //

    unregisterCanvas(): void

    unregisterCanvasSection(id: string): void

    unregisterCanvasGrid(sectionId: string): void

    //

    getCanvasSection(id: string): CanvasSectionNode | undefined

    getCanvasSectionByName(name: string): CanvasSectionNode | undefined

    getCanvasSections(): CanvasSectionNode[] | undefined

    getCanvasGrid(sectionId: string): CanvasGridNode | undefined

    getCanvasGrids(sectionId: string): CanvasGridNode[] | undefined
}