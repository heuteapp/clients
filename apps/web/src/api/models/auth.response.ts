import { ProfileData } from "@/src/core/types/domain/profile/profile.data";

export interface SignInResponse {
    accessToken: string;
    profile: ProfileData;
}

export type SignUpResponse = boolean;