import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { BoardData } from "./board.types"

type BoardStore = {
    board: BoardData | null
    setBoard: (updater: (board: BoardData | null) => BoardData | null) => void
}

export const useBoardStore = create<BoardStore>()(
    immer(set => ({
        board: null,

        setBoard: (updater) => set(state => {
            state.board = updater(state.board)
        })
    }))
)