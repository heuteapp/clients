import axios from "axios";

export const heuteClient = axios.create({
    baseURL: "/api",
    withCredentials: true,
});

heuteClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

heuteClient.interceptors.response.use(
    (response) => {
        const newToken = response.headers["x-new-access-token"];
        
        if (newToken) {
            localStorage.setItem("accessToken", newToken);
            console.log("Token refreshed automatically");
        }
        
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("accessToken");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);