import { BoardCardData } from "@/src/core/types/domain/board/board.data"
import { DataContent } from "@/src/core/types/shared/data"
import { BoardContentValue } from "./board.content";

export type BoardStore = BoardState & {
    setState: (state: BoardState) => void
} & BoardActions;

export type BoardState = BoardContentValue

export type BoardActions = {
    createCard: (content: DataContent<BoardCardData>) => BoardCardData
    deleteCard: (name: string) => BoardCardData | undefined
}