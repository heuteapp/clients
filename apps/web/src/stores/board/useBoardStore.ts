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

        addCard: async (interaction, card) => {
            interaction.executeInteraction();

            try {

                const request = {
                    sectionName: card.sectionName,
                    rowIndex: card.rowIndex,
                    colIndex: card.colIndex,
                    rowSpan: card.rowSpan,
                    colSpan: card.colSpan
                }

                console.log(request);

                await addCardToServer("temp", "mihr", new Date().toISOString().split('T')[0], request);

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
        },

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