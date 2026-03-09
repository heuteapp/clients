import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { BoardCardData, BoardData } from "@/src/domain/board/board.types"
import { HeuteLayoutData, LayoutSectionData } from "@/src/domain/layout/types/data"

type BoardStore = {
    board: BoardData | null
    cards: BoardCardData[]    
    layout: HeuteLayoutData | null
    sections: LayoutSectionData[]

    setBoard: (updater: (board: BoardData | null) => BoardData | null) => void
    addCard: (card: BoardCardData) => void

    setLayout: (updater: (layout: HeuteLayoutData | null) => HeuteLayoutData | null) => void
    setSections: (sections: LayoutSectionData[]) => void
}

export const useBoardStore = create<BoardStore>()(
    immer(set => ({
        board: {
            id: "test",
            category: "test",
            date: new Date(),
            layoutId: "two",
        },

        cards: [],

        setBoard: (updater) => set(state => {
            state.board = updater(state.board)
        }),

        addCard: (card) => set(state => {
            if (state.board) {
                console.log("Adding card", card);
                state.cards.push({ ...card, id: crypto.randomUUID() })
            }
        }),

        layout: null,
        sections: [],

        setLayout: (updater) => set(state => {
            state.layout = updater(state.layout)
        }),

        setSections: (sections) => set(state => {
            state.sections = sections;
        })
    }))
)