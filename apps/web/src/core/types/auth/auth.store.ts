import { AuthState } from "./auth.state";

export interface AuthStore extends AuthState {
    setState: (state: AuthState) => void;
}