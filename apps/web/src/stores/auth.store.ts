// src/stores/auth.store.ts
import { create } from "zustand";
import { AuthStore } from "../core/types/auth/auth.store";

export const useAuthStore = create<AuthStore>((set) => ({
    accessToken: typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,
    profile: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("profile") || "null")  : null,

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
}));