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

        addCard: async (interaction, card) => set(async state => {
            interaction.executeInteraction();

            try {

                await new Promise(resolve => setTimeout(resolve, 500));

                set(state => {
                    if (!state.board) {
                        throw new Error("No board found");
                    }

                    state.cards.push({ ...card, id: crypto.randomUUID() })
                });

                interaction.endInteraction();
            } catch (error) {

                console.log("Error adding card", error);
                interaction.throwInteraction(error as Error);
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