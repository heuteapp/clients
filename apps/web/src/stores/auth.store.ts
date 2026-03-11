import { create } from "zustand";
import { AuthState, AuthStore } from "../core/types/auth/auth.store";
import { ProfileData } from "@/src//core/types/domain/profile/profile.data";

export const useAuthStore = create<AuthStore>((set) => ({
    accessToken: null,
    profile: null,

    loadAuth: () => {
        if (typeof window === "undefined") return null;
        const accessToken = localStorage.getItem("accessToken");
        const profile = JSON.parse(localStorage.getItem("profile") || "null") as ProfileData;

        const auth = { accessToken, profile };
        return auth;
    },

    setAuth: (accessToken, profile) => {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("profile", JSON.stringify(profile));
        set({ accessToken, profile });
    },

    clearAuth: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("profile");
        set({ accessToken: null, profile: null });
    },

    hydrate: () => {
        if (typeof window === "undefined") return;
        const accessToken = localStorage.getItem("accessToken");
        const profile = JSON.parse(localStorage.getItem("profile") || "null");
        set({ accessToken, profile });
    },
}));