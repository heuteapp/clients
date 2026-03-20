import { AuthData } from "./auth.data";

export class AuthFacade {
    constructor(private manager: AuthFacadeManagerInterface) {}

    get auth() {
        return this.manager.auth;
    }

    get isAuthenticated() {
        return this.manager.isAuthenticated;
    }

    signOut() {
        this.manager.signOut();
    }
}

export interface AuthFacadeManagerInterface {
    readonly auth: AuthData | null;

    readonly isAuthenticated: boolean;

    signOut(): void;
};