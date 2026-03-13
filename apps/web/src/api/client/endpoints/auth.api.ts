import { serverApi } from "@/src/api/client/server";
import { LoginRequest } from "../../models/auth.request";

export const authApi = {
    login: (request: LoginRequest) =>
        serverApi.post("/auth/login", request),
};