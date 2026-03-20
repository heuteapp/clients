import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { AuthStore } from "@/src/types/core/auth/auth.store";

export const useAuthSttore = create<AuthStore>()(
    immer((set) => ({
        auth: null,

        setAuth: (auth) => {
            set((draft) => {
                draft.auth = auth;
            });
        },
        clearAuth: () => {
            set((draft) => {
                draft.auth = null;
            });
        }
    }))
)