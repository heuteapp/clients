import { ProfileData } from "@/src/types/core/domain/profile/profile.data";

export interface SignInResponse {
    accessToken: string;
    profile: ProfileData;
}

export type SignUpResponse = {
    message: string;
}