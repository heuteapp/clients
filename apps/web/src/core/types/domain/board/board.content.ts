import { HeuteLayoutData, LayoutSectionData } from "../layout/layout.data"
import { BoardData, BoardCardData } from "./board.data"

export type BoardContentValue = {
    board: BoardData | null
    cards: BoardCardData[]    
    layout: HeuteLayoutData | null
    sections: LayoutSectionData[]
}