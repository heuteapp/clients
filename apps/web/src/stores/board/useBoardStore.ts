import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { BoardStore } from "./BoardStore";

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