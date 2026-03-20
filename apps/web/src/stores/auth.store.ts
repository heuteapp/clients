import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { AuthStore } from "@/src/types/core/auth/auth.store";

export const useAuthSttore = create<AuthStore>()(
    immer((set) => ({
        accessToken: null,
        profile: null,
        setAuth: (auth) => {
            set((draft) => {
                draft.accessToken = auth.accessToken;
                draft.profile = auth.profile;
            });
        }
    }))
)