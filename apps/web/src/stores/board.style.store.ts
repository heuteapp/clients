import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { BoardStyleState, BoardStyleStore } from "../core/types/domain/board/board.style.store";

export const useBoardStyleStore = create<BoardStyleStore>()(
    immer(set => ({
        board: null,
        cards: [],
        layout: null,
        sections: [],

        setState: (state: BoardStyleState) => {
            set(s => {
                s.board = state.board
                s.layout = state.layout
                s.sections = state.sections
                s.cards = state.cards
            })
        },
    }))
)