import { ProfileData } from "@/src/core/types/domain/profile/profile.data";

export interface AuthData {
    accessToken: string | null;
    profile: ProfileData | null;
}