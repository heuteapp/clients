import { BoardCardContainerNode, BoardCardNode, BoardRootNode } from "@/src/modules/ui-board/types/board.nodes"
import { BoardCardContainerProps, BoardCardItemProps, BoardRootProps } from "@/src/modules/ui-board/types/board.props"
import { CanvasRegistry } from "@/src/modules/ui-canvas/types/canvas.registry"

export interface BoardRegistry {
    board: BoardRootNode
    canvasRegistry: CanvasRegistry

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
        props: BoardCardItemProps
    ): BoardCardNode

    //

    unregisterBoard(): void

    unregisterBoardCardContainer(): void

    unregisterBoardCard(id: string): void

    //

    getBoardCardContainer(): BoardCardContainerNode | undefined

    getBoardCard(id: string): BoardCardNode | undefined

    getBoardCards(): BoardCardNode[] | undefined

    getBoardCardsForGrid(gridId: string): BoardCardNode[] | undefined
}