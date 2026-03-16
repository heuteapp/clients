import { useContext } from "react"
import { AuthContextValue } from "@/src/ui/types/auth/auth.context"
import { AuthContext } from "@/src/ui/contexts/auth.context"

export function useAuthContext() : AuthContextValue {
    const ctx = useContext(AuthContext)

    if (!ctx) {
        throw new Error("useAuthContext must be used inside AuthProvider")
    }

    return ctx
}