import { HeuteLayoutContext } from "@/src/contexts/domain/HeuteLayoutContext"
import { useContext } from "react"

export function useHeuteLayout() {
    const ctx = useContext(HeuteLayoutContext)

    if (!ctx) {
        throw new Error("useHeuteLayout must be used inside HeuteLayout")
    }

    return ctx
}