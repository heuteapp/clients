import axios from "axios";
import { useAuthStore } from "../stores/auth.store";

export const server = axios.create({
    baseURL: "http://localhost:5120",
    headers: {
        "Content-Type": "application/json",
    }
});

server.interceptors.request.use((config) => {
    if (config.url?.startsWith("/workspace")) {
        const accessToken = useAuthStore.getState().accessToken;

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
    }

    return config;
});