import axios from "axios";
import { useAuthStore } from "../states/auth/auth.store";
import { authApi } from "./endpoints/auth.api";
import { boardApi } from "./endpoints/workspace/board.api";
import { layoutApi } from "./endpoints/workspace/layout.api";

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
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

serverApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
        console.log("Unauthorized - logging out");
        useAuthStore.getState().signOut?.();

        if (typeof window !== "undefined") {
        window.location.href = "/login";
      }

        }
        return Promise.reject(error);
    }
);