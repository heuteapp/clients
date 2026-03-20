import { AuthData } from "./auth.data";

export class AuthFacade {
    constructor(private manager: AuthFacadeManagerInterface) {}

    get auth() {
        return this.manager.auth;
    }

    signOut() {
        this.manager.signOut();
    }
}

export interface AuthFacadeManagerInterface {
    readonly auth: AuthData | null;

    signOut(): void;
};