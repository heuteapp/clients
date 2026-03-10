import { BoardData, BoardCardData } from "@/src/core/types/board/board.data"
import { HeuteLayoutData, LayoutSectionData } from "@/src/core/types/layout/layout.data"
import { BoardInteraction } from "@/src/ui/interactions/board.interaction.types"

export type BoardStore = {
    board: BoardData | null
    cards: BoardCardData[]    
    layout: HeuteLayoutData | null
    sections: LayoutSectionData[]

    setBoard: (updater: (board: BoardData | null) => BoardData | null) => void
    addCard: (interaction: BoardInteraction, card: BoardCardData) => Promise<void>

    setLayout: (updater: (layout: HeuteLayoutData | null) => HeuteLayoutData | null) => void
    setSections: (sections: LayoutSectionData[]) => void
}