import { BoardData, BoardCardData } from "@/src/core/types/domain/board/board.data"
import { HeuteLayoutData, LayoutSectionData } from "@/src/core/types/domain/layout/layout.data"
import { DataContent } from "@/src/core/types/shared/data"

export type BoardStore = {
    board: BoardData | null
    cards: BoardCardData[]    
    layout: HeuteLayoutData | null
    sections: LayoutSectionData[]

    setBoard: (updater: (board: BoardData | null) => BoardData | null) => void
    setLayout: (updater: (layout: HeuteLayoutData | null) => HeuteLayoutData | null) => void
    setSections: (sections: LayoutSectionData[]) => void

    createCard: (content: DataContent<BoardCardData>) => BoardCardData
    deleteCard: (id: string) => BoardCardData | undefined
}