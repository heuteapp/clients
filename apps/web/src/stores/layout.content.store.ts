import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { LayoutContentStore, LayoutContentValue } from "@/src/core/types/domain/layout/layout.content";

export const useLayoutContentStore = create<LayoutContentStore>()(
    immer(set => ({
        layout: null,
        sections: [],

        setState: (state: LayoutContentValue) => {
            set(s => {
                s.layout = state.layout
                s.sections = state.sections
            })
        },
    }))
)