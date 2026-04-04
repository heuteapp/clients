import { immer } from "zustand/middleware/immer";

import { LayoutBaseState, StoredLayoutItem, StoredLayoutItemContent, StoredLayoutSectionItem, StoredLayoutSectionItemContent } from "../../types/layout/layout.base.types";
import { LayoutBase } from "@/src/modules/layout/types/layout.base.types";
import { getLayoutItem, saveLayoutToState } from "../../utils/layout.utils";

export const baseLayoutImmer = <
    TLayoutSource extends LayoutBase,
    TLayoutItem extends StoredLayoutItem<TLayoutSection>,
    TLayoutItemContent extends StoredLayoutItemContent,
    TLayoutSection extends StoredLayoutSectionItem,
    TLayoutSectionContent extends StoredLayoutSectionItemContent
>() => {

    type LayoutState = LayoutBaseState<TLayoutSource, TLayoutItem, TLayoutItemContent, TLayoutSection, TLayoutSectionContent>;

    return (
        immer<LayoutState>((set, get) => ({
            byId: {},
            sectionById: {},
            userOrder: [],

            loadGlobalLayout: (layout: TLayoutSource) => {
                set((state) => {
                    const owner = "g";
                    saveLayoutToState(state as LayoutState, owner, layout);
                    if (!state.userOrder.includes(owner)) {
                        state.userOrder.push(owner);
                    }
                });
            },

            loadMeLayout: (layout: TLayoutSource) => {
                set((state) => {
                    const owner = "me";
                    saveLayoutToState(state as LayoutState, owner, layout);
                    if (!state.userOrder.includes(owner)) {
                        state.userOrder.push(owner);
                    }
                });
            },

            loadUserLayout: (user: string, layout: TLayoutSource) => {
                set((state) => {
                    saveLayoutToState(state as LayoutState, user, layout);

                    state.userOrder = state.userOrder.filter(u => u !== user);
                    state.userOrder.push(user);

                    while (state.userOrder.length > 20) {
                        const oldestUser = state.userOrder.shift();
                        if (!oldestUser) continue;

                        const layoutIds = Object.keys(state.byId)
                            .filter(id => id.startsWith(`${oldestUser}@`));

                        for (const layoutId of layoutIds) {
                            const sectionKeys = Object.keys(state.sectionById)
                                .filter(k => k.startsWith(`${layoutId}/`));
                            sectionKeys.forEach(k => delete state.sectionById[k]);
                            delete state.byId[layoutId];
                        }
                    }
                });
            },

            getGlobalLayout: (name: string, version: number) => {
                return getLayoutItem(get(), "g", name, version);
            },

            getMeLayout: (name: string, version: number) => {
                return getLayoutItem(get(), "me", name, version);
            },

            getUserLayout: (user: string, name: string, version: number) => {
                return getLayoutItem(get(), user, name, version);
            },

            hasUser: (user: string) => {
                return Object.keys(get().byId).some(id => id.startsWith(`${user}@`));
            },

            sortMe: () => {

            },

            sortUser: (user: string) => {

            },

            clearMe: () => {
            },

            clearUser: (user: string) => {
                
            }
        }))
    )
}