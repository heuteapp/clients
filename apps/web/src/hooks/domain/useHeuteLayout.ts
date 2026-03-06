import { HeuteLayoutContext } from "@/src/domain/layout/layout.context"
import { useContext } from "react"

export function useHeuteLayout() {
    const ctx = useContext(HeuteLayoutContext)

    if (!ctx) {
        throw new Error("useHeuteLayout must be used inside HeuteLayout")
    }

    return ctx
}