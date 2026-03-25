import { BoardCardContainerNode, BoardCardNode, BoardRootNode, BoardLayoutRootNode } from "@/src/ui-board/types/board.nodes"
import { BoardCardContainerProps, BoardCardProps, BoardRootProps } from "@/src/ui-board/types/board.props"
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

    //

    unregisterBoard(): void

    unregisterBoardCardContainer(): void

    unregisterBoardCard(id: Identifier): void

    //

    getBoardCardContainer(): BoardCardContainerNode | undefined

    getBoardCard(id: Identifier): BoardCardNode | undefined

    getBoardCards(): BoardCardNode[] | undefined

    getBoardCardsForSection(sectionId: Identifier): BoardCardNode[] | undefined
}