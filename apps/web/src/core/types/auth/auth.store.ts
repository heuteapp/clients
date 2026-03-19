import { ProfileData } from "@/src/core/types/domain/profile/profile.data";

export interface AuthStore extends AuthState, AuthActions {

}

export interface AuthState {
    accessToken: string | null;
    profile: ProfileData | null;
}

export interface AuthActions {
    hydrate: () => AuthState | null;
    signIn: (accessToken: string, profile: ProfileData) => void;
    signOut: () => void;
}