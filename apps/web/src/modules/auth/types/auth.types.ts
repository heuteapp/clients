export interface AuthSession {
    accessToken: string;
    profile: AuthProfile;
}

export interface AuthProfile {
    username: string;
    email: string;
}

//

export interface AuthRegistration {
    email: string;
    expiredAt: number;
}