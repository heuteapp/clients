import { serverApi } from "@/src/api/client/server";
import { LoginRequest, SignupRequest } from "../../models/auth.request";

export const authApi = {
    login: (request: LoginRequest) =>
        serverApi.post("/auth/login", request),
    signup: (request: SignupRequest) =>
        serverApi.post("/auth/signup", request),
};