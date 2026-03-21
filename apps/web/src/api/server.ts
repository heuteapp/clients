import axios from "axios";
import { authApi } from "./endpoints/auth.api";
import { boardApi } from "./endpoints/workspace/board.api";
import { layoutApi } from "./endpoints/workspace/layout.api";
import { authService } from "../states/auth/auth.machine";

export const server = {
    auth: authApi,
    workspace: {
        board: boardApi,
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
    const accessToken = authService.getSnapshot().context.auth?.accessToken;
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