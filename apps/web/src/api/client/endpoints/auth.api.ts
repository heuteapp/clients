import { serverApi } from "@/src/api/client/server";
import { SignInRequest, SignUpRequest } from "../../models/auth.request";

export const authApi = {
    signIn: (request: SignInRequest) =>
        serverApi.post("/auth/sign-in", { request.identifier, password: request.password }),
    signUp: (request: SignUpRequest) =>
        serverApi.post("/auth/sign-up", request),
};