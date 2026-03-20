import { DataContent } from "@/src/types/shared/data"
import { LayoutData, LayoutSectionData } from "@/src/types/core/domain/layout/layout.data"
import { BoardData, BoardCardData } from "./board.data"

export interface BoardContentState {
    board: BoardData | null
    cards: BoardCardData[]
    layout: LayoutData | null
    sections: LayoutSectionData[]
}

export interface BoardContentActions {
    createCard: (content: DataContent<BoardCardData>) => BoardCardData
    deleteCard: (name: string) => BoardCardData | undefined
}

export interface BoardContentBase extends BoardContentState, BoardContentActions {

}

export interface BoardContentStore extends BoardContentState, BoardContentActions {
    setState: (value: BoardContentState) => void
};