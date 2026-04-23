import { CanvasRootNode, CanvasGridSectionNode, CanvasGridItemNode } from "./canvas.nodes"
import { CanvasRootProps, CanvasGridSectionProps, CanvasGridItemProps, CanvasGridContainerProps } from "./canvas.props"

export interface CanvasRegistry {
    canvas: CanvasRootNode

    registerCanvasRoot(
        ref: React.RefObject<HTMLDivElement | null>,
        props: CanvasRootProps,
    ): CanvasRootNode

    registerCanvasGridContainer(
        ref: React.RefObject<HTMLDivElement | null>,
        props: CanvasGridContainerProps,
    ): void

    registerCanvasGridSection(
        gridName: string,
        ref: React.RefObject<HTMLDivElement | null>,
        props: CanvasGridSectionProps
    ): CanvasGridSectionNode

    registerCanvasGridItem(
        gridName: string,
        ref: React.RefObject<HTMLDivElement | null>,
        props: CanvasGridItemProps
    ): CanvasGridItemNode

    //

    unregisterCanvas(): void

    unregisterCanvasGridContainer(): void

    unregisterCanvasGridSection(gridName: string): void

    unregisterCanvasGridItem(gridName: string): void

    //

    getCanvasGridSection(gridName: string): CanvasGridSectionNode | undefined

    getCanvasGridSections(): CanvasGridSectionNode[] | undefined

    getCanvasGridItem(gridName: string): CanvasGridItemNode | undefined

    getCanvasGridItems(): CanvasGridItemNode[] | undefined
}