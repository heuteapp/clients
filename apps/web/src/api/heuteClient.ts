import axios, { InternalAxiosRequestConfig } from "axios";
import { authService } from "../modules/auth/state/auth.machine";
import { AuthSession } from "../modules/auth/types/auth.types";

// Retry için custom config tipi
interface RetryableConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

export const heuteClient = axios.create({
    baseURL: "/api",
    withCredentials: true,
});

heuteClient.interceptors.request.use((config) => {
    
    try {
        const tempAccessToken = authService.getSnapshot().context.temp.accessToken;
        if(tempAccessToken) {
            config.headers.Authorization = `Bearer ${tempAccessToken}`;
            return config;
        }

        const authSession = localStorage.getItem("session");
        if(authSession) {
            const { accessToken } = JSON.parse(authSession) as AuthSession;
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
                return config;
            }
        }
    } catch (e) {
        console.error("Failed to parse auth session", e);
    }
    
    return config;
});