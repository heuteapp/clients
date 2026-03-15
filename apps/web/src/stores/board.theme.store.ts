import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { BoardThemeStore, BoardThemeValue } from "../core/types/domain/board/board.theme";

export const useBoardThemeStore = create<BoardThemeStore>()(
    immer(set => ({
        board: null,
        cards: [],
        layout: null,
        sections: [],

        setState: (value: BoardThemeValue) => {
            set(s => {
                s.board = value.board
                s.layout = value.layout
                s.sections = value.sections
                s.cards = value.cards
            })
        },
    }))
)