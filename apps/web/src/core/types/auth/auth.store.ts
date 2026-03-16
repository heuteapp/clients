import { ProfileData } from "@/src/core/types/domain/profile/profile.data";

export interface AuthStore extends AuthState, AuthActions {

}

export interface AuthState {
    accessToken: string | null;
    profile: ProfileData | null;
}

export interface AuthActions {
    signOut: () => void;
    hydrate: () => void;
}