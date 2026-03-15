import { DataContent } from "@/src/core/types/shared/data"
import { HeuteLayoutData, LayoutSectionData } from "@/src/core/types/domain/layout/layout.data"
import { BoardData, BoardCardData } from "./board.data"

export type BoardContentStore = BoardContentValue & {
    setState: (value: BoardContentValue) => void
} & BoardContentActions;

export type BoardContentValue = {
    board: BoardData | null
    cards: BoardCardData[]    
    layout: HeuteLayoutData | null
    sections: LayoutSectionData[]
}

export type BoardContentActions = {
    createCard: (content: DataContent<BoardCardData>) => BoardCardData
    deleteCard: (name: string) => BoardCardData | undefined
}