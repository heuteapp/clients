import { useAuthStore } from "@/src/states/auth/auth.store";
import { AuthFacadeManagerInterface } from "@/src/types/core/auth/auth.facade";

export class AuthFacadeManager implements AuthFacadeManagerInterface {
    public get auth() {
        const { context } = this.#getSnapshot();
        
        return context.auth;
    }

    public signOut() {
        const { service } = this.#getStore();
        service.send({ type: "SIGN_OUT" });
    }

    #getStore() {
        return useAuthStore.getState();
    }

    #getService() {
        const { service } = this.#getStore();
        return service;
    }

    #getSnapshot() {
        const service = this.#getService();
        return service.getSnapshot();
    }
}