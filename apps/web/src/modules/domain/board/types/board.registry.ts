import { BoardCardContainerNode, BoardCardNode, BoardRootNode, BoardLayoutGridNode, BoardLayoutRootNode, BoardLayoutSectionNode } from "@/src/modules/domain/board/types/board.nodes"
import { BoardCardContainerProps, BoardCardProps, BoardRootProps, BoardLayoutRootProps, BoardLayoutGridProps, BoardLayoutSectionProps } from "@/src/modules/domain/board/types/board.props"
import { Identifier } from "@/src/types/shared/core/data"

export interface BoardRegistry {
    board: BoardRootNode
    layout: BoardLayoutRootNode

    registerBoard(
        ref: React.RefObject<HTMLDivElement | null>,
        props: BoardRootProps
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
        props: BoardLayoutRootProps,
    ): BoardLayoutRootNode

    registerLayoutSection(
        id: Identifier,
        ref: React.RefObject<HTMLDivElement | null>,
        props: BoardLayoutSectionProps
    ): BoardLayoutSectionNode

    registerLayoutGrid(
        sectionId: Identifier,
        ref: React.RefObject<HTMLDivElement | null>,
        props: BoardLayoutGridProps
    ): BoardLayoutGridNode

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

    getLayoutSection(id: Identifier): BoardLayoutSectionNode | undefined

    getLayoutSectionByName(name: string): BoardLayoutSectionNode | undefined

    getLayoutSections(): BoardLayoutSectionNode[] | undefined

    getLayoutGrid(sectionId: Identifier): BoardLayoutGridNode | undefined

    getLayoutGrids(sectionId: Identifier): BoardLayoutGridNode[] | undefined
}