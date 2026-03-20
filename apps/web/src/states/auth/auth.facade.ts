import { useAuthStore } from "@/src/stores/auth.store";
import { authMachine } from "./auth.machine";
import { AuthFacadeManagerInterface } from "@/src/types/core/auth/auth.facade";

export class AuthFacadeManager implements AuthFacadeManagerInterface {
    public get auth() {
        const { auth } = this.#getState();
        return auth;
    }

    public signOut() {
        const machine = this.#getMachine();
    }

    #getMachine() : typeof authMachine {
        return authMachine;
    }

    #getState() {
        return useAuthStore.getState();
    }
}