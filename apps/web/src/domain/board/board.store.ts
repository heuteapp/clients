import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { BoardCardData, BoardData } from "./board.types"
import { sectionExamples } from "./board.examples"

type BoardStore = {
    board: BoardData | null
    setBoard: (updater: (board: BoardData | null) => BoardData | null) => void
    addCard: (card: BoardCardData) => void
}

export const useBoardStore = create<BoardStore>()(
    immer(set => ({
        board: {
            id: "test",
            category: "test",
            date: new Date(),
            layout: {
                columnCount: 18,
                rowCount: 8,
                sections: sectionExamples.two
            },
            cards: []
        },

        setBoard: (updater) => set(state => {
            state.board = updater(state.board)
        }),

        addCard: (card) => set(state => {
            if (state.board) {
                console.log("Adding card", card);
                state.board.cards.push({ ...card, id: crypto.randomUUID() })
            }
        })
    }))
)