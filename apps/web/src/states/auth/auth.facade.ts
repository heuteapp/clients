import { useAuthStore } from "@/src/stores/auth.store";
import { AuthFacadeManagerInterface } from "@/src/types/core/auth/auth.facade";

export class AuthFacadeManager implements AuthFacadeManagerInterface {
    public get auth() {
        const { auth } = this.#getStore();
        return auth;
    }

    public signOut() {
        const { service } = this.#getStore();
        service.send({ type: "SIGN_OUT" });
    }

    #getStore() {
        return useAuthStore.getState();
    }
}