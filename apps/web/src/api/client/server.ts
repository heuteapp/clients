import axios from "axios";
import { useAuthStore } from "../../stores/auth.store";

export const serverApi = axios.create({
    baseURL: "https://api.heuteapp.net",
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