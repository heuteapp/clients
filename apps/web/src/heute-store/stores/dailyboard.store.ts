import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Dailyboard } from "@/src/modules/dailyboard/types/dailyboard.types";
import { DailyboardState, StoredDailyboard, StoredDailyboardCard } from "@/src/heute-store/types/dailyboard.types";
import { YYMMDDDate } from "@/src/modules/shared/types/date.types";

export const useDailyboardStore = create<DailyboardState>()(
    devtools(
        immer((set, get) => ({
            byId: {},
            cardById: {},
            userOrder: [],

            loadMeDailyboard: (categoryPath: string, dailyboard: Dailyboard) => {
                set((state) => {
                    const owner = 'me';
                    const dailyboardId = `${owner}@${categoryPath}/${dailyboard.date.raw}`;
                    
                    state.byId[dailyboardId] = {
                        id: dailyboardId,
                        layoutName: dailyboard.layoutName,
                        layoutVersion: dailyboard.layoutVersion,
                        date: dailyboard.date,
                        categoryId: () => categoryPath,
                    };
                    
                    for (let i = 0; i < dailyboard.cards.length; i++) {
                        const card = dailyboard.cards[i];
                        const cardId = `${dailyboardId}/card/${i}`;
                        state.cardById[cardId] = {
                            id: cardId,
                            dailyboardId: () => dailyboardId,
                            name: card.name,
                            content: card.content,
                            placement: card.placement,
                        };
                    }
                    
                    if (!state.userOrder.includes(owner)) {
                        state.userOrder.push(owner);
                    }
                });
            },

            loadUserDailyboard: (user: string, categoryPath: string, dailyboard: Dailyboard) => {
                set((state) => {
                    const dailyboardId = `${user}@${categoryPath}/${dailyboard.date.raw}`;
                    
                    state.byId[dailyboardId] = {
                        id: dailyboardId,
                        layoutName: dailyboard.layoutName,
                        layoutVersion: dailyboard.layoutVersion,
                        date: dailyboard.date,
                        categoryId: () => categoryPath,
                    };
                    
                    for (let i = 0; i < dailyboard.cards.length; i++) {
                        const card = dailyboard.cards[i];
                        const cardId = `${dailyboardId}/card/${i}`;
                        state.cardById[cardId] = {
                            id: cardId,
                            dailyboardId: () => dailyboardId,
                            name: card.name,
                            content: card.content,
                            placement: card.placement,
                        };
                    }
                    
                    state.userOrder = state.userOrder.filter(u => u !== user);
                    state.userOrder.push(user);
                    
                    while (state.userOrder.length > 20) {
                        const oldestUser = state.userOrder.shift();
                        if (oldestUser) {
                            const userBoardIds = Object.keys(state.byId).filter(key => key.startsWith(`${oldestUser}@`));
                            for (const boardId of userBoardIds) {
                                const cardKeys = Object.keys(state.cardById).filter(cardKey => 
                                    cardKey.startsWith(`${boardId}/`)
                                );
                                for (const cardKey of cardKeys) {
                                    delete state.cardById[cardKey];
                                }
                                delete state.byId[boardId];
                            }
                        }
                    }
                });
            },

            getMeDailyboard: (categoryPath: string, date: YYMMDDDate) => {
                const state = get();
                const id = `me@${categoryPath}/${date.raw}`;
                return (state.byId[id] as StoredDailyboard) || null;
            },

            getUserDailyboard: (user: string, categoryPath: string, date: YYMMDDDate) => {
                const state = get();
                const id = `${user}@${categoryPath}/${date.raw}`;
                return (state.byId[id] as StoredDailyboard) || null;
            },
            
            getMeCardsByDailyboard: (categoryPath: string, date: YYMMDDDate) => {
                const dailyboardId = `me@${categoryPath}/${date.raw}`;
                const state = get();
                return Object.values(state.cardById).filter(card => card.dailyboardId() === dailyboardId) as StoredDailyboardCard[];
            },
            
            getUserCardsByDailyboard: (user: string, categoryPath: string, date: YYMMDDDate) => {
                const dailyboardId = `${user}@${categoryPath}/${date.raw}`;
                const state = get();
                return Object.values(state.cardById).filter(card => card.dailyboardId() === dailyboardId) as StoredDailyboardCard[];
            },
            
            hasUser: (user: string) => {
                return get().userOrder.includes(user);
            },
            
            clearMe: () => {
                set((state) => {
                    const meBoardIds = Object.keys(state.byId).filter(key => key.startsWith('me@'));
                    for (const boardId of meBoardIds) {
                        const cardKeys = Object.keys(state.cardById).filter(cardKey => 
                            cardKey.startsWith(`${boardId}/`)
                        );
                        for (const cardKey of cardKeys) {
                            delete state.cardById[cardKey];
                        }
                        delete state.byId[boardId];
                    }
                    state.userOrder = state.userOrder.filter(u => u !== 'me');
                });
            },
            
            clearUser: (user: string) => {
                set((state) => {
                    const userBoardIds = Object.keys(state.byId).filter(key => key.startsWith(`${user}@`));
                    for (const boardId of userBoardIds) {
                        const cardKeys = Object.keys(state.cardById).filter(cardKey => 
                            cardKey.startsWith(`${boardId}/`)
                        );
                        for (const cardKey of cardKeys) {
                            delete state.cardById[cardKey];
                        }
                        delete state.byId[boardId];
                    }
                    state.userOrder = state.userOrder.filter(u => u !== user);
                });
            },
        })),
        { 
            name: "DailyboardStore"
        }
    )
);