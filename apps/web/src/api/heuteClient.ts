import axios from "axios";
import { authService } from "../modules/auth/state/auth.machine";

export const heuteClient = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, 
});

//

heuteClient.interceptors.request.use((config) => {
    let accessToken = null;
    
    if (typeof window !== "undefined") {
        accessToken = localStorage.getItem("temp_accessToken");
    }
    
    if (!accessToken) {
        accessToken = authService.getSnapshot().context.auth?.accessToken;
    }

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    return config;
});

heuteClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 || error.response?.status === 403) {
            if (originalRequest.url === '/auth/refresh') {
                return Promise.reject(error);
            }
            
            try {
                const { data } = await heuteClient.post('/auth/refresh');
                const { accessToken } = data;
                
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return heuteClient(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('auth');
                return Promise.reject(refreshError);
            }
        }
        
        return Promise.reject(error);
    }
);