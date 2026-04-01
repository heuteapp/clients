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
    let accessToken = authService.getSnapshot().context.auth?.accessToken;

    if (!accessToken && typeof window !== "undefined") {
        accessToken = localStorage.getItem("temp_accessToken") || undefined;
    }

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

heuteClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            authService.send({ type: "SIGN_OUT" });
        }
        return Promise.reject(error);
    }
);