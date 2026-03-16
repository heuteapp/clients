export interface SignInRequest {
    identifier: string;
    password: string;
}

export interface SignUpRequest {
    username: string;
    email: string;
    password: string;
}