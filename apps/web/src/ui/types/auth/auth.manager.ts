import { SignInRequest } from "@/src/api/models/auth.request";
import { AuthStoreController } from "./auth.store";

export type AuthManager = {
    store: AuthStoreController;
    signIn: (request: SignInRequest) => Promise<void>;
    signOut: () => Promise<void>;
    hydrate: () => Promise<void>;
}