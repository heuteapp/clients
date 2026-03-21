import { AuthData } from "./auth.data";

export interface AuthFacadeManagerInterface {
    readonly auth: AuthData | null;

    readonly isAuthenticated: boolean;

    signOut(): void;
};