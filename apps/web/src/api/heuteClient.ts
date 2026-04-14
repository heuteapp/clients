import axios from "axios";
import { authService } from "../modules/auth/state/auth.machine";

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
    (response) => {
        const newSessionHeader = response.headers["x-new-auth-session"];
        
        if (newSessionHeader) {
            try {
                const newSession = JSON.parse(newSessionHeader);
                
                localStorage.setItem("auth", JSON.stringify(newSession));
                
                console.log("Session refreshed automatically", newSession);
            } catch (e) {
                console.error("Failed to parse new session", e);
            }
        }
        
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            const newSessionHeader = error.response.headers["x-new-auth-session"];
            let isUnauthorized = true;
            
            if (newSessionHeader) {
                try {
                    const newSession = JSON.parse(newSessionHeader);
                    
                    localStorage.setItem("auth", JSON.stringify(newSession));
                    
                    console.log("Session refreshed automatically", newSession);
                    isUnauthorized = false;
                } catch (e) {
                    console.error("Failed to parse new session", e);
                }
            }

            if (isUnauthorized) {
                authService.send({ type: "SIGN_OUT" });
            }
        }
        return Promise.reject(error);
    }
);