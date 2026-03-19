import { ProfileData } from "../domain/profile/profile.data";

export interface AuthState {
    accessToken: string | null;
    profile: ProfileData | null;
}

export interface PendingSignUp {
    email: string;
    expiredAt: number;
}