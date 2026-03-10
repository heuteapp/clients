import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { BoardStore } from "@/src/core/types/domain/board/board.store";

export const useBoardStore = create<BoardStore>()(
    immer(set => ({
        board: null,
        layout: null,
        sections: [],
        cards: [],

        setBoard: (updater) => set(state => {
            state.board = updater(state.board)
        }),

        setLayout: (updater) => set(state => {
            state.layout = updater(state.layout)
        }),

        setSections: (sections) => set(state => {
            state.sections = sections;
        }),

        addCard: (card) => {
            set(state => {
                state.cards.push(card);
            })
        },

        removeCard: (cardId) => {
            set(state => {
                state.cards = state.cards.filter(card => card.id !== cardId);
            })
        }
    }))
)