import { BoardData, BoardCardData } from "@/src/core/types/domain/board/board.data"
import { HeuteLayoutData, LayoutSectionData } from "@/src/core/types/domain/layout/layout.data"
import { DataContent, Identifier } from "@/src/core/types/shared/data"

export type BoardStore = BoardState & {
    setState: (state: BoardState) => void
} & BoardActions;

export type BoardState = {
    board: BoardData | null
    cards: BoardCardData[]    
    layout: HeuteLayoutData | null
    sections: LayoutSectionData[]
}

export type BoardActions = {
    createCard: (content: DataContent<BoardCardData>) => BoardCardData
    deleteCard: (id: Identifier) => BoardCardData | undefined
}