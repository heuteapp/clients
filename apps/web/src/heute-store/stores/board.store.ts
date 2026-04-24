import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { create } from "zustand";

import { 
    BoardBaseState, 
    StoredBoardItem, 
    StoredBoardItemData, 
    StoredBoardCardItem, 
    StoredBoardCardItemData 
} from "../types/board.types";
import { BoardBase, BoardCardBase } from "@/src/modules/d-board/types/board.base.types";
import { addCardToDailyboardState, getBoardCardItemFromState, getBoardItemFromState, removeCardFromDailyboardState, saveDailyboardToState, updateCardInDailyboardState } from "../utils/board.utils";
import { BoardModelState } from "../types/board.types";
import { YYMMDDDate } from "@/src/modules/d-shared/types/date.types";

export const withDailyboardImmer = <
    TBoardSource extends BoardBase,
    TBoardCardSource extends BoardCardBase,
    TBoardItem extends StoredBoardItem<TBoardCardItem>,
    TBoardItemData extends StoredBoardItemData,
    TBoardCardItem extends StoredBoardCardItem,
    TBoardCardItemData extends StoredBoardCardItemData
>() => {

    type BoardState = BoardBaseState<
        TBoardSource, 
        TBoardCardSource,
        TBoardItem, 
        TBoardItemData, 
        TBoardCardItem, 
        TBoardCardItemData
    >;

    return (
        immer<BoardState>((set, get) => ({
            byId: {},
            cardById: {},
            userOrder: [],

            loadMeDailyboard: (dailyboard: TBoardSource) => {
                set((state) => {
                    const owner = "me";
                    saveDailyboardToState(state as BoardState, owner, dailyboard);
                    if (!state.userOrder.includes(owner)) {
                        state.userOrder.push(owner);
                    }
                });
            },

            loadUserDailyboard: (user: string, dailyboard: TBoardSource) => {
                set((state) => {
                    saveDailyboardToState(state as BoardState, user, dailyboard);

                    state.userOrder = state.userOrder.filter(u => u !== user);
                    state.userOrder.push(user);

                    // Limit 20 user cache
                    while (state.userOrder.length > 20) {
                        const oldestUser = state.userOrder.shift();
                        if (!oldestUser) continue;

                        // Delete user's dailyboards
                        const dailyboardIds = Object.keys(state.byId)
                            .filter(id => id.startsWith(`${oldestUser}@`));

                        for (const dailyboardId of dailyboardIds) {
                            // Delete cards belonging to this dailyboard
                            const cardKeys = Object.keys(state.cardById)
                                .filter(k => k.startsWith(`${dailyboardId}/`));
                            cardKeys.forEach(k => delete state.cardById[k]);
                            delete state.byId[dailyboardId];
                        }
                    }
                });
            },

            getMeDailyboard: (categoryPath: string, date: YYMMDDDate) => {
                return getBoardItemFromState(get(), "me", categoryPath, date);
            },

            getUserDailyboard: (user: string, categoryPath: string, date: YYMMDDDate) => {
                return getBoardItemFromState(get(), user, categoryPath, date);
            },

            getMeDailyboardCard: (categoryPath: string, date: YYMMDDDate, cardKey: string) => {
                return getBoardCardItemFromState(get(), "me", categoryPath, date, cardKey);
            },

            getUserDailyboardCard: (user: string, categoryPath: string, date: YYMMDDDate, cardKey: string) => {
                return getBoardCardItemFromState(get(), user, categoryPath, date, cardKey);
            },

            addCard: (categoryPath: string, date: YYMMDDDate, card: TBoardCardSource) => {
                set((state) => {
                    addCardToDailyboardState(state as BoardState, categoryPath, date, card);
                });
            },

            updateCard: (categoryPath: string, date: YYMMDDDate, cardKey: string, cardUpdates: (draftCard: TBoardCardItemData) => void) => {
                set((state) => {
                    return updateCardInDailyboardState(state as BoardState, categoryPath, date, cardKey, cardUpdates);
                });
            },

            removeCard: (categoryPath: string, date: YYMMDDDate, cardName: string) => {
                set((state) => {
                    removeCardFromDailyboardState(state as BoardState, categoryPath, date, cardName);
                });
            },

            hasUser: (user: string) => {
                return Object.keys(get().byId).some(id => id.startsWith(`${user}@`));
            },

            sortMe: () => {
                // Optional: implement sorting logic for "me" dailyboards
            },

            sortUser: (user: string) => {
                // Optional: implement sorting logic for user dailyboards
            },

            clearMe: () => {
                set((state) => {
                    const owner = "me";
                    const dailyboardIds = Object.keys(state.byId)
                        .filter(id => id.startsWith(`${owner}@`));

                    for (const dailyboardId of dailyboardIds) {
                        const cardKeys = Object.keys(state.cardById)
                            .filter(k => k.startsWith(`${dailyboardId}/`));
                        cardKeys.forEach(k => delete state.cardById[k]);
                        delete state.byId[dailyboardId];
                    }

                    state.userOrder = state.userOrder.filter(u => u !== owner);
                });
            },

            clearUser: (user: string) => {
                set((state) => {
                    const dailyboardIds = Object.keys(state.byId)
                        .filter(id => id.startsWith(`${user}@`));

                    for (const dailyboardId of dailyboardIds) {
                        const cardKeys = Object.keys(state.cardById)
                            .filter(k => k.startsWith(`${dailyboardId}/`));
                        cardKeys.forEach(k => delete state.cardById[k]);
                        delete state.byId[dailyboardId];
                    }

                    state.userOrder = state.userOrder.filter(u => u !== user);
                });
            }
        }))
    );
};

export const useDailyboardDataStore = create<BoardModelState>()(
    devtools(withDailyboardImmer(), { name: "DailyboardModelStore" })
);