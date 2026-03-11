import { create } from "zustand";
import { AuthStore } from "../core/types/auth/auth.store";

export const useAuthStore = create<AuthStore>((set) => ({
    accessToken: null,
    profile: null,
    isLoaded: false,

    setAuth: (accessToken, profile) => {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("profile", JSON.stringify(profile));
        set({ accessToken, profile, isLoaded: true });
    },

    clearAuth: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("profile");
        set({ accessToken: null, profile: null, isLoaded: true });
    },

    hydrate: () => {
        if (typeof window === "undefined") return;
        const accessToken = localStorage.getItem("accessToken");
        const profile = JSON.parse(localStorage.getItem("profile") || "null");
        set({ accessToken, profile, isLoaded: true });
    },
}));