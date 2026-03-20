import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { AuthStore } from "@/src/types/core/auth/auth.store";

export const useAuthSttore = create<AuthStore>()(
    immer((set) => ({
        accessToken: null,
        profile: null,
        setState: (state) => {
            set((draft) => {
                draft.accessToken = state.accessToken;
                draft.profile = state.profile;
            });
        }
    }))
)