import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { BoardThemeState, BoardThemeStore } from "../core/types/domain/board/board.theme.store";

export const useBoardThemeStore = create<BoardThemeStore>()(
    immer(set => ({
        board: null,
        cards: [],
        layout: null,
        sections: [],

        setState: (state: BoardThemeState) => {
            set(s => {
                s.board = state.board
                s.layout = state.layout
                s.sections = state.sections
                s.cards = state.cards
            })
        },
    }))
)