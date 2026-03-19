import { ProfileData } from "../domain/profile/profile.data";

export interface AuthState {
    accessToken: string | null;
    profile: ProfileData | null;
}

export interface AuthRegistration {
    email: string;
    expiredAt: number;
}