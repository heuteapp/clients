import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { LayoutThemeStore, LayoutThemeValue } from "@/src/core/types/domain/layout/layout.theme";

export const useLayoutThemeStore = create<LayoutThemeStore>()(
    immer(set => ({
        layout: null,
        sections: [],

        setState: (value: LayoutThemeValue) => {
            set(s => {
                s.layout = value.layout
                s.sections = value.sections
            })
        },
    }))
)