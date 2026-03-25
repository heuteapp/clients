import { BoardCardContainerNode, BoardCardNode, BoardRootNode } from "@/src/modules/ui-board/types/board.nodes"
import { BoardCardContainerProps, BoardCardProps, BoardRootProps } from "@/src/modules/ui-board/types/board.props"
import { LayoutRegistry } from "@/src/modules/ui-layout/types/layout.registry"

export interface BoardRegistry {
    board: BoardRootNode
    layoutRegistry: LayoutRegistry

    registerBoard(
        ref: React.RefObject<HTMLDivElement | null>,
        props: BoardRootProps
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

    //

    unregisterBoard(): void

    unregisterBoardCardContainer(): void

    unregisterBoardCard(id: string): void

    //

    getBoardCardContainer(): BoardCardContainerNode | undefined

    getBoardCard(id: string): BoardCardNode | undefined

    getBoardCards(): BoardCardNode[] | undefined

    getBoardCardsForSection(sectionId: string): BoardCardNode[] | undefined
}