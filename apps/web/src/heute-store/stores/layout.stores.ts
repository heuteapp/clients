import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Layout } from "@/src/modules/layout/types/layout.types";
import { LayoutState, StoredLayout, StoredLayoutSection } from "@/src/heute-store/types/layout.types";

export const useLayoutStore = create<LayoutState>()(
    devtools(
        immer((set, get) => ({
            byId: {},
            sectionById: {},
            userOrder: [],

            loadGlobalLayout: (layout: Layout) => {
                set((state) => {
                    const owner = "g";
                    saveLayoutToState(state, owner, layout);
                    if (!state.userOrder.includes(owner)) {
                        state.userOrder.push(owner);
                    }
                });
            },

            loadMeLayout: (layout: Layout) => {
                set((state) => {
                    const owner = "me";
                    saveLayoutToState(state, owner, layout);
                    if (!state.userOrder.includes(owner)) {
                        state.userOrder.push(owner);
                    }
                });
            },

            loadUserLayout: (user: string, layout: Layout) => {
                set((state) => {
                    saveLayoutToState(state, user, layout);

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
                return getLayout(get(), "g", name, version);
            },

            getMeLayout: (name: string, version: number) => {
                return getLayout(get(), "me", name, version);
            },

            getUserLayout: (user: string, name: string, version: number) => {
                return getLayout(get(), user, name, version);
            },

            getGlobalSectionsByLayout: (name: string, version: number) => {
                const layout = get().getGlobalLayout(name, version);
                return getSectionsByLayoutId(get(), layout?.id || null);
            },

            getMeSectionsByLayout: (name: string, version: number) => {
                const layout = get().getMeLayout(name, version);
                return getSectionsByLayoutId(get(), layout?.id || null);
            },

            getUserSectionsByLayout: (user: string, name: string, version: number) => {
                const layout = get().getUserLayout(user, name, version);
                return getSectionsByLayoutId(get(), layout?.id || null);
            },
        })),
        { name: "LayoutStore" }
    )
);

const saveLayoutToState = (state: any, owner: string, layout: Layout) => {
    const layoutId = `${owner}@${layout.name}/${layout.version}`;

    state.byId[layoutId] = {
        id: layoutId,
        ...layout,
    };

    layout.sections.forEach((section) => {
        const sectionId = `${layoutId}/${section.name}`;
        state.sectionById[sectionId] = {
            id: sectionId,
            layoutId: () => layoutId,
            ...section,
        };
    });
};

const getLayout = (state: any, owner: string, name: string, version: number) => {
    const key = Object.keys(state.byId).find(id => id.startsWith(`${owner}@${name}/${version}`));
    return key ? state.byId[key] as StoredLayout : null;
};

const getSectionsByLayoutId = (state: LayoutState, layoutId: string | null) => {
    if (!layoutId) return [];
    return Object.values(state.sectionById).filter(s => s.layoutId() === layoutId) as StoredLayoutSection[];
};