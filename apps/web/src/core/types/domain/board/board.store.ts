import { BoardData, BoardCardData } from "@/src/core/types/domain/board/board.data"
import { HeuteLayoutData, LayoutSectionData } from "@/src/core/types/domain/layout/layout.data"
import { DataContent, Identifier } from "@/src/core/types/shared/data"

export type BoardStore = {
    board: BoardData | null
    cards: BoardCardData[]    
    layout: HeuteLayoutData | null
    sections: LayoutSectionData[]

    setBoard: (board: BoardData | null) => void
    setCards: (cards: BoardCardData[]) => void
    setLayout: (layout: HeuteLayoutData | null) => void
    setSections: (sections: LayoutSectionData[]) => void
    
} & BoardStoreActions;

export type BoardStoreActions = {
    createCard: (content: DataContent<BoardCardData>) => BoardCardData
    deleteCard: (id: Identifier) => BoardCardData | undefined
}