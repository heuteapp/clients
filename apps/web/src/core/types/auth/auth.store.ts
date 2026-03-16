import { SignInRequest, SignUpRequest } from "@/src/api/models/auth.request";
import { ProfileData } from "@/src/core/types/domain/profile/profile.data";

export interface AuthStore extends AuthState, AuthActions {

}

export interface AuthState {
    accessToken: string | null;
    profile: ProfileData | null;
}

export interface AuthActions {
    signIn: (request: SignInRequest) => void;
    signUp: (request: SignUpRequest) => void;
    signOut: () => void;
    hydrate: () => void;
}