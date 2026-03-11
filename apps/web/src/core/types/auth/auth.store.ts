import { ProfileData } from "@/src/core/types/domain/profile/profile.data";

export interface AuthStore extends AuthState, AuthActions {

}

export interface AuthState {
    accessToken: string | null;
    profile: ProfileData | null;
}

export interface AuthActions {
    loadAuth: () => AuthState | null;
    setAuth: (accessToken: string, profile: ProfileData) => void;
    clearAuth: () => void;
    hydrate: () => void;
}