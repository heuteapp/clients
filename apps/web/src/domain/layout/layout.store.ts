import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { HeuteLayoutData, LayoutSectionData } from "./types/data"

type LayoutStore = {
    layout: HeuteLayoutData | null
    sections: LayoutSectionData[]

    setLayout: (updater: (layout: HeuteLayoutData | null) => HeuteLayoutData | null) => void
    setSections: (sections: LayoutSectionData[]) => void
}

export const useLayoutStore = create<LayoutStore>()(
    immer(set => ({
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