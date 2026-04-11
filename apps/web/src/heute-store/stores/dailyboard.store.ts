import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { create } from "zustand";

import { 
    DailyboardBaseState, 
    StoredDailyboardItem, 
    StoredDailyboardItemContent, 
    StoredDailyboardCardItem, 
    StoredDailyboardCardItemContent 
} from "../types/dailyboard.types";
import { DailyboardBase, DailyboardCardBase } from "@/src/modules/dailyboard/types/dailyboard.base.types";
import { addCardToDailyboardState, getDailyboardItemFromState, removeCardFromDailyboardState, saveDailyboardToState, updateCardInDailyboardState } from "../utils/dailyboard.utils";
import { DailyboardDataState } from "../types/dailyboard.types";
import { YYMMDDDate } from "@/src/modules/shared/types/date.types";

export const withDailyboardImmer = <
    TDailyboardSource extends DailyboardBase,
    TDailyboardCardSource extends DailyboardCardBase,
    TDailyboardItem extends StoredDailyboardItem<TDailyboardCardItem>,
    TDailyboardItemContent extends StoredDailyboardItemContent,
    TDailyboardCardItem extends StoredDailyboardCardItem,
    TDailyboardCardItemContent extends StoredDailyboardCardItemContent
>() => {

    type DailyboardState = DailyboardBaseState<
        TDailyboardSource, 
        TDailyboardCardSource,
        TDailyboardItem, 
        TDailyboardItemContent, 
        TDailyboardCardItem, 
        TDailyboardCardItemContent
    >;

    return (
        immer<DailyboardState>((set, get) => ({
            byId: {},
            cardById: {},
            userOrder: [],

            loadMeDailyboard: (dailyboard: TDailyboardSource) => {
                set((state) => {
                    const owner = "me";
                    saveDailyboardToState(state as DailyboardState, owner, dailyboard);
                    if (!state.userOrder.includes(owner)) {
                        state.userOrder.push(owner);
                    }
                });
            },

            loadUserDailyboard: (user: string, dailyboard: TDailyboardSource) => {
                set((state) => {
                    saveDailyboardToState(state as DailyboardState, user, dailyboard);

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
                return getDailyboardItemFromState(get(), "me", categoryPath, date);
            },

            getUserDailyboard: (user: string, categoryPath: string, date: YYMMDDDate) => {
                return getDailyboardItemFromState(get(), user, categoryPath, date);
            },

            addCard: (categoryPath: string, date: YYMMDDDate, card: TDailyboardCardSource) => {
                set((state) => {
                    addCardToDailyboardState(state as DailyboardState, categoryPath, date, card);
                });
            },

            updateCard: (categoryPath: string, date: YYMMDDDate, cardKey: string, cardUpdates: (draftCard: TDailyboardCardItemContent) => void) => {
                set((state) => {
                    updateCardInDailyboardState(state as DailyboardState, categoryPath, date, cardKey, cardUpdates);
                });
            },

            removeCard: (categoryPath: string, date: YYMMDDDate, cardName: string) => {
                set((state) => {
                    removeCardFromDailyboardState(state as DailyboardState, categoryPath, date, cardName);
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

export const useDailyboardDataStore = create<DailyboardDataState>()(
    devtools(withDailyboardImmer(), { name: "DailyboardDataStore" })
);