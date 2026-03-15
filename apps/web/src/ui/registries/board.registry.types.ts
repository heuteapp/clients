import { LayoutGridCellNode, LayoutGridNode, LayoutRootNode, LayoutSectionContainerNode, LayoutSectionNode } from "@/src/ui/types/layout/layout.nodes"
import { HeuteLayoutProps, LayoutSectionContainerProps, LayoutSectionProps, LayoutGridProps, LayoutGridCellProps } from "@/src/ui/types/layout/layout.props"
import { BoardCardContainerNode, BoardCardNode, BoardRootNode } from "@/src/ui/types/board/board.nodes"
import { BoardCardContainerProps, BoardCardProps, HeuteBoardProps } from "@/src/ui/types/board/board.props"
import { Identifier } from "@/src/core/types/shared/data"

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
        id: Identifier,
        ref: React.RefObject<HTMLDivElement | null>,
        props: BoardCardProps
    ): BoardCardNode

    registerLayout(
        ref: React.RefObject<HTMLDivElement | null>,
        props: HeuteLayoutProps,
    ): LayoutRootNode

    registerLayoutSection(
        id: Identifier,
        ref: React.RefObject<HTMLDivElement | null>,
        props: LayoutSectionProps
    ): LayoutSectionNode

    registerLayoutGrid(
        sectionId: Identifier,
        ref: React.RefObject<HTMLDivElement | null>,
        props: LayoutGridProps
    ): LayoutGridNode

    //

    unregisterBoard(): void

    unregisterBoardCardContainer(): void

    unregisterBoardCard(id: Identifier): void

    unregisterLayout(): void

    unregisterLayoutSection(id: Identifier): void

    unregisterLayoutGrid(sectionId: Identifier): void

    //

    getBoardCardContainer(): BoardCardContainerNode | undefined

    getBoardCard(id: Identifier): BoardCardNode | undefined

    getBoardCards(): BoardCardNode[] | undefined

    getBoardCardsForSection(sectionId: Identifier): BoardCardNode[] | undefined

    getLayoutSection(id: Identifier): LayoutSectionNode | undefined

    getLayoutSectionByName(name: string): LayoutSectionNode | undefined

    getLayoutSections(): LayoutSectionNode[] | undefined

    getLayoutGrid(sectionId: Identifier): LayoutGridNode | undefined

    getLayoutGrids(sectionId: Identifier): LayoutGridNode[] | undefined
}