import { SignInRequest } from "@/src/api/models/auth.request";

export type AuthManager = {
    signIn: (request: SignInRequest) => Promise<void>;
    signOut: () => Promise<void>;
    hydrate: () => Promise<void>;
}

export type AuthManagerRef = React.RefObject<AuthManager | null>;