import axios from "axios";
import { useAuthStore } from "../../stores/auth.store";
import { useRouter } from "next/navigation";

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
        window.location.href = "/login"; // zorla yönlendir
      }

        }
        return Promise.reject(error);
    }
);