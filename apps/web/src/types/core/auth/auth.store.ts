import { AuthData } from "@/src/types/core/auth/auth.data";

export interface AuthStore {
    auth: AuthData | null;

    setAuth: (auth: AuthData) => void;
    clearAuth: () => void;
}