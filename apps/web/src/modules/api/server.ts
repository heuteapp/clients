import axios from "axios";
import { authApi } from "./endpoints/auth.api";
import { dailyboardApi } from "./endpoints/workspace/dailyboard.api";
import { layoutApi } from "./endpoints/workspace/layout.api";
import { authService } from "../auth/state/auth.machine";

export const server = {
    auth: authApi,
    workspace: {
        dailyboard: dailyboardApi,
        layout: layoutApi
    }
};

export const serverApi = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, 
});

serverApi.interceptors.request.use((config) => {
    let accessToken = authService.getSnapshot().context.auth?.accessToken;

    if (!accessToken && typeof window !== "undefined") {
        accessToken = localStorage.getItem("temp_accessToken") || undefined;
    }

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

serverApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            authService.send({ type: "SIGN_OUT" });
        }
        return Promise.reject(error);
    }
);