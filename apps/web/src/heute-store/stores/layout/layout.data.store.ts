import { devtools } from "zustand/middleware";
import { withLayoutImmer } from "./layout.base.store";
import { create } from "zustand";
import { LayoutDataState } from "../../types/layout/layout.data.types";

export const useLayoutStore = create<LayoutDataState>()(
    devtools(withLayoutImmer(), { name: "LayoutDataStore" })
);