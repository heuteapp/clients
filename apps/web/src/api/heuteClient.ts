import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { authService } from "../modules/auth/state/auth.machine";

// Retry için custom config tipi
interface RetryableConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

export const heuteClient = axios.create({
    baseURL: "/api",
    withCredentials: true,
});

heuteClient.interceptors.request.use((config) => {
    const authSession = localStorage.getItem("session");
    
    if (authSession) {
        try {
            const { accessToken } = JSON.parse(authSession);
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        } catch (e) {
            console.error("Failed to parse auth session", e);
        }
    }
    
    return config;
});