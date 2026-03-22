import { ProfileData } from "@/src/types/core/domain/profile/profile.data";

export interface AuthData {
    accessToken: string;
    profile: ProfileData;
}