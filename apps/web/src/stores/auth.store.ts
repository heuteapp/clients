import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createActor } from "xstate";
import { authMachine } from "@/src/states/auth/auth.machine";
import { AuthStore } from "@/src/types/core/auth/auth.store";

export const useAuthStore = create<AuthStore>()(
    immer((set) => {
        const service = createActor(authMachine);

        service.subscribe((state) => {
            set((draft) => {
                draft.auth = state.context.auth;
            });
        });

        return {
            auth: null,
            service,

            setAuth: (auth) => {
                set((draft) => {
                draft.auth = auth;
                });
            },
            clearAuth: () => {
                set((draft) => {
                draft.auth = null;
                });
            },
        };
    })
);