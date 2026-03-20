import { create } from "zustand";
import { createActor } from "xstate";
import { authMachine } from "@/src/states/auth/auth.machine";
import { AuthStore } from "@/src/types/states/auth/auth.store";

export const useAuthStore = create<AuthStore>()(() => {
    const service = createActor(authMachine).start();

    return {
        service,
    }
});