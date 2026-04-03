import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Dailyboard } from "@/src/modules/dailyboard/types/dailyboard.types";
import { DailyboardState, StoredDailyboard } from "@/src/heute-store/types/dailyboard.types";
import { YYMMDDDate } from "@/src/modules/shared/types/date.types";

export const useDailyboardStore = create<DailyboardState>()(
    devtools(
        immer((set, get) => ({
            byId: {},
            userOrder: [],

            loadMeDailyboard: (categoryPath: string, dailyboard: Dailyboard) => {
                set((state) => {
                    const owner = 'me';
                    const dailyboardId = `${owner}@${categoryPath}/${dailyboard.date}`;
                    
                    state.byId[dailyboardId] = {
                        id: dailyboardId,
                        layoutName: dailyboard.layoutName,
                        layoutVersion: dailyboard.layoutVersion,
                        date: dailyboard.date,
                        categoryId: () => categoryPath
                    };
                    
                    if (!state.userOrder.includes(owner)) {
                        state.userOrder.push(owner);
                    }
                });
            },

            loadUserDailyboard: (user: string, categoryPath: string, dailyboard: Dailyboard) => {
                set((state) => {
                    const dailyboardId = `${user}@${categoryPath}/${dailyboard.date}`;
                    
                    state.byId[dailyboardId] = {
                        id: dailyboardId,
                        layoutName: dailyboard.layoutName,
                        layoutVersion: dailyboard.layoutVersion,
                        date: dailyboard.date,
                        categoryId: () => categoryPath
                    };
                    
                    state.userOrder = state.userOrder.filter(u => u !== user);
                    state.userOrder.push(user);
                    
                    while (state.userOrder.length > 20) {
                        const oldestUser = state.userOrder.shift();
                        if (oldestUser) {
                            const userKeys = Object.keys(state.byId).filter(key => key.startsWith(`${oldestUser}@`));
                            userKeys.forEach(key => {
                                delete state.byId[key];
                            });
                        }
                    }
                });
            },

            getMeDailyboard: (categoryPath: string, date: YYMMDDDate) => {
                const state = get();
                const id = `me@${categoryPath}/${date}`;
                return (state.byId[id] as StoredDailyboard) || null;
            },

            getUserDailyboard: (user: string, categoryPath: string, date: YYMMDDDate) => {
                const state = get();
                const id = `${user}@${categoryPath}/${date}`;
                return (state.byId[id] as StoredDailyboard) || null;
            },
            
            hasUser: (user: string) => {
                return get().userOrder.includes(user);
            },
            
            clearMe: () => {
                set((state) => {
                    const meKeys = Object.keys(state.byId).filter(key => key.startsWith('me@'));
                    meKeys.forEach(key => {
                        delete state.byId[key];
                    });
                    state.userOrder = state.userOrder.filter(u => u !== 'me');
                });
            },
            
            clearUser: (user: string) => {
                set((state) => {
                    const userKeys = Object.keys(state.byId).filter(key => key.startsWith(`${user}@`));
                    userKeys.forEach(key => {
                        delete state.byId[key];
                    });
                    state.userOrder = state.userOrder.filter(u => u !== user);
                });
            },
        })),
        { 
            name: "DailyboardStore"
        }
    )
);