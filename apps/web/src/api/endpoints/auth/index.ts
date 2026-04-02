import { heuteClient } from "@/src/api/heuteClient";
import { SignInRequest, SignUpRequest } from "@/src/api/models/requests/auth.request";
import { SignInResponse, SignUpResponse } from "@/src/api/models/responses/auth.response";
import { AuthProfile } from "@/src/modules/auth/types/auth.types";

export const auth = {
    signIn: (request: SignInRequest): Promise<SignInResponse> =>
        heuteClient.post<SignInResponse>("/auth/sign-in", request).then(res => res.data),
    
    signUp: (request: SignUpRequest): Promise<SignUpResponse> =>
        heuteClient.post<SignUpResponse>("/auth/sign-up", request).then(res => res.data),

    refresh: (): Promise<{ accessToken: string, profile: AuthProfile }> =>
        heuteClient.post("/auth/refresh").then(res => res.data),
};