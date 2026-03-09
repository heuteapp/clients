import { LayoutGridCellNode, LayoutGridNode, LayoutRootNode, LayoutSectionContainerNode, LayoutSectionNode } from "@/src/ui/types/layout/nodes"
import { HeuteLayoutProps, LayoutSectionContainerProps, LayoutSectionProps, LayoutGridProps, LayoutGridCellProps } from "@/src/ui/types/layout/props"
import { BoardCardContainerNode, BoardCardNode, BoardRootNode } from "@/src/ui/types/board/nodes"
import { BoardCardContainerProps, BoardCardProps, HeuteBoardProps } from "@/src/ui/types/board/props"

export interface BoardRegistry {
    board: BoardRootNode
    layout: LayoutRootNode

    registerBoard(
        ref: React.RefObject<HTMLDivElement | null>,
        props: HeuteBoardProps
    ): BoardRootNode

    registerBoardCardContainer(
        ref: React.RefObject<HTMLDivElement | null>,
        props: BoardCardContainerProps  
    ): BoardCardContainerNode

    registerBoardCard(
        id: string,
        ref: React.RefObject<HTMLDivElement | null>,
        props: BoardCardProps
    ): BoardCardNode

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

    unregisterBoard(): void

    unregisterBoardCardContainer(): void

    unregisterBoardCard(id: string): void

    unregisterLayout(): void

    unregisterLayoutSectionContainer(): void

    unregisterLayoutSection(id: string): void

    unregisterLayoutGrid(sectionId: string): void

    unregisterLayoutGridCell(sectionId: string, id: string): void

    //

    getBoardCardContainer(): BoardCardContainerNode | undefined

    getBoardCard(id: string): BoardCardNode | undefined

    getBoardCards(): BoardCardNode[] | undefined

    getBoardCardsForSection(sectionId: string): BoardCardNode[] | undefined

    getLayoutSection(id: string): LayoutSectionNode | undefined

    getLayoutSections(): LayoutSectionNode[] | undefined

    getLayoutGrid(sectionId: string): LayoutGridNode | undefined

    getLayoutGrids(sectionId: string): LayoutGridNode[] | undefined

    getLayoutGridCell(sectionId: string, id: string): LayoutGridCellNode | undefined

    getLayoutGridCells(sectionId: string): LayoutGridCellNode[] | undefined
}