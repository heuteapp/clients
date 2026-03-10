import { BoardData, BoardCardData } from "@/src/core/types/board/board.data"
import { HeuteLayoutData, LayoutSectionData } from "@/src/core/types/layout/layout.data"

export type BoardStore = {
    board: BoardData | null
    cards: BoardCardData[]    
    layout: HeuteLayoutData | null
    sections: LayoutSectionData[]

    setBoard: (updater: (board: BoardData | null) => BoardData | null) => void
    setLayout: (updater: (layout: HeuteLayoutData | null) => HeuteLayoutData | null) => void
    setSections: (sections: LayoutSectionData[]) => void

    addCard: (card: BoardCardData) => void
    removeCard: (cardId: string) => void
}