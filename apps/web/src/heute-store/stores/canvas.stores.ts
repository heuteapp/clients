import { immer } from "zustand/middleware/immer";

import { CanvasBaseState, StoredCanvasItem, StoredCanvasItemContent, StoredCanvasSectionItem, StoredCanvasSectionItemContent } from "../types/canvas.types";
import { CanvasBase } from "@/src/modules/canvas/types/canvas.base.types";
import { getCanvasItemFromState, saveCanvasToState } from "../utils/canvas.utils";
import { devtools } from "zustand/middleware";
import { create } from "zustand";
import { CanvasDataState, CanvasStyleState } from "../types/canvas.types";

export const withCanvasImmer = <
    TCanvasSource extends CanvasBase,
    TCanvasItem extends StoredCanvasItem<TCanvasSection>,
    TCanvasItemContent extends StoredCanvasItemContent,
    TCanvasSection extends StoredCanvasSectionItem,
    TCanvasSectionContent extends StoredCanvasSectionItemContent
>() => {

    type CanvasState = CanvasBaseState<TCanvasSource, TCanvasItem, TCanvasItemContent, TCanvasSection, TCanvasSectionContent>;

    return (
        immer<CanvasState>((set, get) => ({
            byId: {},
            sectionById: {},
            userOrder: [],

            loadGlobalCanvas: (canvas: TCanvasSource) => {
                set((state) => {
                    const owner = "g";
                    saveCanvasToState(state as CanvasState, owner, canvas);
                    if (!state.userOrder.includes(owner)) {
                        state.userOrder.push(owner);
                    }
                });
            },

            loadMeCanvas: (canvas: TCanvasSource) => {
                set((state) => {
                    const owner = "me";
                    saveCanvasToState(state as CanvasState, owner, canvas);
                    if (!state.userOrder.includes(owner)) {
                        state.userOrder.push(owner);
                    }
                });
            },

            loadUserCanvas: (user: string, canvas: TCanvasSource) => {
                set((state) => {
                    saveCanvasToState(state as CanvasState, user, canvas);

                    state.userOrder = state.userOrder.filter(u => u !== user);
                    state.userOrder.push(user);

                    while (state.userOrder.length > 20) {
                        const oldestUser = state.userOrder.shift();
                        if (!oldestUser) continue;

                        const canvasIds = Object.keys(state.byId)
                            .filter(id => id.startsWith(`${oldestUser}@`));

                        for (const canvasId of canvasIds) {
                            const sectionKeys = Object.keys(state.sectionById)
                                .filter(k => k.startsWith(`${canvasId}/`));
                            sectionKeys.forEach(k => delete state.sectionById[k]);
                            delete state.byId[canvasId];
                        }
                    }
                });
            },

            getGlobalCanvas: (name: string, version: number) => {
                return getCanvasItemFromState(get(), "g", name, version);
            },

            getMeCanvas: (name: string, version: number) => {
                return getCanvasItemFromState(get(), "me", name, version);
            },

            getUserCanvas: (user: string, name: string, version: number) => {
                return getCanvasItemFromState(get(), user, name, version);
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

export const useCanvasDataStore = create<CanvasDataState>()(
    devtools(withCanvasImmer(), { name: "CanvasDataStore" })
);

export const useCanvasStyleStore = create<CanvasStyleState>()(
    devtools(withCanvasImmer(), { name: "CanvasStyleStore" })
);