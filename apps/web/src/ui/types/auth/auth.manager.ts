import { SignInRequest, SignUpRequest } from "@/src/api/models/auth.request";

export type AuthManager = {
    signIn: (request: SignInRequest) => Promise<void>;
    signUp: (request: SignUpRequest) => Promise<void>;
    signOut: () => Promise<void>;
    hydrate: () => Promise<void>;
}

export type AuthManagerRef = React.RefObject<AuthManager | null>;