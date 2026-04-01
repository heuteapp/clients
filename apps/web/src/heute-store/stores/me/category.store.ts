import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { MeCategoryState } from "@/src/heute-store/types/me/category.types";

export const useMeCategoryStore = create<MeCategoryState>()(
    immer((set) => ({
        byId: new Map(),
        byParentId: new Map(),
        rootIds: [],
    }))
);