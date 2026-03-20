import { authService } from "@/src/states/auth/auth.machine";
import { AuthFacadeManagerInterface } from "@/src/types/core/auth/auth.facade";

export class AuthFacadeManager implements AuthFacadeManagerInterface {
    public get auth() {
        const { context } = this.#getSnapshot();
        
        return context.auth;
    }

    public get isAuthenticated() {
        return this.#getSnapshot().matches('authenticated');
    }

    public signOut() {
        authService.send({ type: "SIGN_OUT" });
    }

    //

    #getSnapshot = () => {
        return authService.getSnapshot();
    }
}