import { serverApi } from "@/src/api/client/server";
import { SignInRequest, SignupRequest } from "../../models/auth.request";

export const authApi = {
    signIn: (request: SignInRequest) =>
        serverApi.post("/auth/login", { name: request.username, password: request.password }),
    signup: (request: SignupRequest) =>
        serverApi.post("/auth/signup", request),
};