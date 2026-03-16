import { create } from "zustand";
import { AuthState, AuthStore } from "../core/types/auth/auth.store";
import { ProfileData } from "@/src//core/types/domain/profile/profile.data";

export const useAuthStore = create<AuthStore>((set) => ({
    accessToken: null,
    profile: null,

    signOut: () => {
        if (typeof window === "undefined") return;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("profile");
        set({ accessToken: null, profile: null });

        window.location.href = "/";
    },

    hydrate: () => {
        if (typeof window === "undefined") return;
        const accessToken = localStorage.getItem("accessToken");
        const profile = JSON.parse(localStorage.getItem("profile") || "null");
        set({ accessToken, profile });
    },
}));