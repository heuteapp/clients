import { AuthActions, AuthState } from "@/src/core/types/auth/auth.store";

export type AuthManager = {
    state: AuthState;
    actions: AuthActions;
}