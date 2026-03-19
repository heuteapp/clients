import { create } from "zustand";
import { AuthStore } from "../core/types/auth/auth.store";
import { ProfileData } from "@/src//core/types/domain/profile/profile.data";

export const useAuthStore = create<AuthStore>((set) => ({
    accessToken: null,
    profile: null,

    hydrate: () => {
        if (typeof window === "undefined") return null;
        const accessToken = localStorage.getItem("accessToken");
        const profile : ProfileData = JSON.parse(localStorage.getItem("profile") || "null");
        set({ accessToken, profile });

        return { accessToken, profile };
    },

    signIn: (accessToken: string, profile: ProfileData) => {
        if (typeof window === "undefined") return;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("profile", JSON.stringify(profile));
        set({ accessToken, profile });
    },

    signOut: () => {
        if (typeof window === "undefined") return;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("profile");
        set({ accessToken: null, profile: null });
    },
}));