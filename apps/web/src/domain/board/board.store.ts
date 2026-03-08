import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { BoardCardData, BoardData } from "./board.types"

type BoardStore = {
    board: BoardData | null
    setBoard: (updater: (board: BoardData | null) => BoardData | null) => void
    addCard: (card: BoardCardData) => void
}

export const useBoardStore = create<BoardStore>()(
    immer(set => ({
        board: null,

        setBoard: (updater) => set(state => {
            state.board = updater(state.board)
        }),

        addCard: (card) => set(state => {
            if (state.board) {
                state.board.cards.push({ ...card, id: crypto.randomUUID() })
            }
        })
    }))
)