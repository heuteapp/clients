import { ProfileData } from "@/src/core/types/domain/profile/profile.data";

export interface AuthStore extends AuthState {
    setState: (state: AuthState) => void;
}

export interface AuthState {
    accessToken: string | null;
    profile: ProfileData | null;
}