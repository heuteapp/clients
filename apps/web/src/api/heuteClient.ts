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
    const authSession = localStorage.getItem("auth");
    
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

heuteClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as RetryableConfig;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            const newSessionHeader = error.response.headers["x-new-auth-session"];
            console.log("Received 401, attempting to refresh session...", { newSessionHeader });
            
            if (newSessionHeader) {
                try {
                    const newSession = JSON.parse(newSessionHeader as string);
                                        console.log(authService.getSnapshot().value);

                    authService.send({ 
                        type: "SESSION_REFRESH",
                        accessToken: newSession.accessToken,
                        profile: newSession.profile,
                    });

                    console.log(authService.getSnapshot().value);
                    
                    originalRequest.headers.Authorization = `Bearer ${newSession.accessToken}`;
                    
                    return heuteClient(originalRequest);
                    
                } catch (e) {
                    console.error("Failed to parse new session", e);
                }
            }
            
            authService.send({ type: "SIGN_OUT" });
        }
        
        return Promise.reject(error);
    }
);