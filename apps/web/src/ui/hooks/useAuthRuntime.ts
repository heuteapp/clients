import { AuthContextValue } from "../types/auth/auth.context";
import { useAuthManager } from "./useAuthManager";

export function useAuthRuntime() : AuthContextValue {
    const manager = useAuthManager();

    return {
        manager
    }
}