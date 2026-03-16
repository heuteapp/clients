import { AuthActions, AuthState } from "@/src/core/types/auth/auth.store";

export type AuthStoreController = {
    state: AuthState;
    actions: AuthActions;
}