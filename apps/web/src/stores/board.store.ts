import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { BoardStore } from "@/src/core/types/domain/board/board.store";
import { createClientId } from "@/src/core/utils/shared/data";
import { DataContent } from "@/src/core/types/shared/data";
import { BoardCardData } from "@/src/core/types/domain/board/board.data";

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

        //

        createCard: (content : DataContent<BoardCardData>) => {
            const card = {
                id: createClientId(),
                ...content,
            }

            set(state => {
                state.cards.push(card);
            })

            return card;
        },

        deleteCard: (id: string) => {
            let deletedCard;

            set(state => {
                deletedCard = state.cards.find(card => card.id === id);
                state.cards = state.cards.filter(card => card.id !== id);
            })

            return deletedCard;
        }
    }))
)