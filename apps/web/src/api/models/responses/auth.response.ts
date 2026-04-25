import { AuthProfile } from "@/src/modules/d-auth/types/auth.types";

export interface SignInResponse {
    accessToken: string;
    profile: AuthProfile;
}

export type SignUpResponse = {
    message: string;
}