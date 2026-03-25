import { UserProfile } from "@/src/modules/user/types/user.profile.types";

export interface AuthSession {
    accessToken: string;
    profile: UserProfile;
}