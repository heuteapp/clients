import { BoardData, BoardCardData } from "@/src/types/board/data"
import { HeuteLayoutData, LayoutSectionData } from "@/src/types/layout/data"

export type BoardStore = {
    board: BoardData | null
    cards: BoardCardData[]    
    layout: HeuteLayoutData | null
    sections: LayoutSectionData[]

    setBoard: (updater: (board: BoardData | null) => BoardData | null) => void
    addCard: (card: BoardCardData) => void

    setLayout: (updater: (layout: HeuteLayoutData | null) => HeuteLayoutData | null) => void
    setSections: (sections: LayoutSectionData[]) => void
}