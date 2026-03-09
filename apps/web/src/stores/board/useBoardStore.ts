import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { BoardStore } from "./BoardStore";
import { api } from "@/src/utils/api";

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

                const session = interaction.sessionRef.current;

                const response = {

                }

                await addCardToServer("temp", "mihr", new Date().toISOString(), card);

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

//

async function addCardToServer(ownerName: string, category: string, date: string, card: any) {
    const response = await api.post(
        `/users/${ownerName}/boards/${category}/${date}/add-card`,
        card
    );

    return response.data;
}