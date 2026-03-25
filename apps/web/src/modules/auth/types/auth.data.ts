import { UserProfile } from "@/src/modules/user/types/user.profile.types";

export interface AuthData {
    accessToken: string;
    profile: UserProfile;
}