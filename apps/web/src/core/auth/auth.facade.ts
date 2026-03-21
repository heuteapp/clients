import { AuthFacadeManagerInterface } from "@/src/types/core/auth/auth.facade";

export class AuthFacade {
    #manager: AuthFacadeManagerInterface | null = null;

    constructor() {}

    get manager() {
        return this.#manager;
    }

    get auth() {
        return this.manager?.auth || null;
    }

    get isAuthenticated() {
        return this.manager?.isAuthenticated || false;
    }

    setManager(manager: AuthFacadeManagerInterface | null) {
        this.#manager = manager;
    }

    signOut() {
        this.manager?.signOut();
    }
}

export const authFacade = new AuthFacade();