import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { BoardState, BoardStore } from "@/src/core/types/domain/board/board.store";
import { createDataIdentifier } from "@/src/core/utils/shared/data";
import { DataContent, Identifier } from "@/src/core/types/shared/data";
import { BoardCardData } from "@/src/core/types/domain/board/board.data";

export const useBoardStore = create<BoardStore>()(
    immer(set => ({
        board: null,
        layout: null,
        sections: [],
        cards: [],

        setState: (state: BoardState) => {
            set(s => {
                s.board = state.board
                s.layout = state.layout
                s.sections = state.sections
                s.cards = state.cards
            })
        },

        //

        createCard: (content : DataContent<BoardCardData>) => {
            const card = {
                id: createDataIdentifier(),
                ...content,
            }

            set(state => {
                state.cards.push(card);
            })

            return card;
        },

        deleteCard: (name: string) => {
            let deletedCard;

            set(state => {
                deletedCard = state.cards.find(card => card.name === name);
                state.cards = state.cards.filter(card => card.name !== name);
            })

            return deletedCard;
        }
    }))
)