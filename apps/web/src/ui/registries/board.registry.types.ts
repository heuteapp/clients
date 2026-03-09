import { LayoutGridCellNode, LayoutGridNode, LayoutRootNode, LayoutSectionContainerNode, LayoutSectionNode } from "@/src/ui/types/layout/nodes"
import { HeuteLayoutProps, LayoutSectionContainerProps, LayoutSectionProps, LayoutGridProps, LayoutGridCellProps } from "@/src/ui/types/layout/props"
import { BoardRootNode } from "../types/board/nodes"

export interface BoardRegistry {
    board: BoardRootNode
    layout: LayoutRootNode

    registerLayout(
        ref: React.RefObject<HTMLDivElement | null>,
        props: HeuteLayoutProps,
    ): LayoutRootNode

    registerLayoutSectionContainer(
        ref: React.RefObject<HTMLDivElement | null>,
        props: LayoutSectionContainerProps
    ): LayoutSectionContainerNode
    
    registerLayoutSection(
        id: string,
        ref: React.RefObject<HTMLDivElement | null>,
        props: LayoutSectionProps
    ): LayoutSectionNode

    registerLayoutGrid(
        sectionId: string,
        ref: React.RefObject<HTMLDivElement | null>,
        props: LayoutGridProps
    ): LayoutGridNode

    registerLayoutGridCell(
        sectionId: string,
        id: string,
        ref: React.RefObject<HTMLDivElement | null>,
        props: LayoutGridCellProps
    ): LayoutGridCellNode

    //

    unregisterLayout(): void

    unregisterLayoutSectionContainer(): void

    unregisterLayoutSection(id: string): void

    unregisterLayoutGrid(sectionId: string): void

    unregisterLayoutGridCell(sectionId: string, id: string): void

    //

    getLayoutSection(id: string): LayoutSectionNode | undefined

    getLayoutSections(): LayoutSectionNode[] | undefined

    getLayoutGrid(sectionId: string): LayoutGridNode | undefined

    getLayoutGrids(sectionId: string): LayoutGridNode[] | undefined

    getLayoutGridCell(sectionId: string, id: string): LayoutGridCellNode | undefined

    getLayoutGridCells(sectionId: string): LayoutGridCellNode[] | undefined
}