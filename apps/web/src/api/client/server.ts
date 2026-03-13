import axios from "axios";
import { useAuthStore } from "../../stores/auth.store";

export const serverApi = axios.create({
    baseURL: "http://localhost:5120",
    headers: {
        "Content-Type": "application/json",
    }
});

serverApi.interceptors.request.use((config) => {
    if (config.url?.startsWith("/workspace")) {
        const accessToken = useAuthStore.getState().accessToken;

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
            config.withCredentials = true;
        }
    }

    return config;
});