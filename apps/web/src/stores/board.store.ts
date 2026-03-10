import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { BoardStore } from "@/src/core/types/domain/board/board.store";
import { createIdentifier } from "@/src/core/utils/shared/data";
import { DataContent, Identifier } from "@/src/core/types/shared/data";
import { BoardCardData } from "@/src/core/types/domain/board/board.data";

export const useBoardStore = create<BoardStore>()(
    immer(set => ({
        board: null,
        layout: null,
        sections: [],
        cards: [],

        setBoard: (board) => set(state => {
            state.board = board;
        }),

        setCards: (cards) => set(state => {
            state.cards = cards;
        }),

        setLayout: (updater) => set(state => {
            state.layout = updater;
        }),

        setSections: (sections) => set(state => {
            state.sections = sections;
        }),

        //

        createCard: (content : DataContent<BoardCardData>) => {
            const card = {
                id: createIdentifier(),
                ...content,
            }

            set(state => {
                state.cards.push(card);
            })

            return card;
        },

        deleteCard: (id: Identifier) => {
            let deletedCard;

            set(state => {
                deletedCard = state.cards.find(card => card.id === id);
                state.cards = state.cards.filter(card => card.id !== id);
            })

            return deletedCard;
        }
    }))
)