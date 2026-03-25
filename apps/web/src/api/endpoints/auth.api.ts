import { serverApi } from "@/src/api/server";
import { SignInRequest, SignUpRequest } from "../models/auth.request";
import { SignInResponse, SignUpResponse } from "../models/auth.response";
import { UserProfile } from "@/src/modules/user/types/user.profile.types";

export const authApi = {
    setRefresh: (refreshToken: string): Promise<void> =>
        serverApi.post("/auth/set-refresh", { refreshToken }),

    signIn: (request: SignInRequest): Promise<SignInResponse> =>
        serverApi.post<SignInResponse>("/auth/sign-in", request).then(res => res.data),
    
    signUp: (request: SignUpRequest): Promise<SignUpResponse> =>
        serverApi.post<SignUpResponse>("/auth/sign-up", request).then(res => res.data),

    me: () : Promise<UserProfile | null> =>
        serverApi.get("/auth/me").then(res => res.data),
};