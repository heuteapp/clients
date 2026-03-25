import { UserProfile } from "@/src/modules/user/types/user.profile.types";

export interface SignInResponse {
    accessToken: string;
    profile: UserProfile;
}

export type SignUpResponse = {
    message: string;
}